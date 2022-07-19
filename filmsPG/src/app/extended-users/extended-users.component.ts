import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/entities/user';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-extended-users',
  templateUrl: './extended-users.component.html',
  styleUrls: ['./extended-users.component.css']
})
export class ExtendedUsersComponent implements OnInit, AfterViewInit {
  displayedColumns = ["id","name","email","active","lastLogin","groups","permissions"];
  users: User[] = [];
  usersDataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getExtendedUsers().subscribe(users => {
      this.users = users;
      this.usersDataSource.data = users;
      console.log(users);
    });
  }

  ngAfterViewInit(): void {
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;
    this.usersDataSource.filterPredicate = (user: User, filter: string):boolean => {
      if (user.name.toLowerCase().includes(filter)) return true;
      if (user.email.toLowerCase().includes(filter)) return true;
      if (user.lastLogin?.toString().toLowerCase().includes(filter)) return true;
      if (user.groups.map(g => g.name).some(name => name.includes(filter))) return true;
      return false;
    };
  }

  applyFilter(event: any) {
    const filterStr = event.target.value.trim().toLowerCase();
    this.usersDataSource.filter = filterStr;
  }
}
