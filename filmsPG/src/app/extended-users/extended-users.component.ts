import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  }
}
