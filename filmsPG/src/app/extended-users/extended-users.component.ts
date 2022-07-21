import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/entities/user';
import { UsersService } from 'src/services/users.service';
import { ConfimDialogComponent } from '../confim-dialog/confim-dialog.component';

@Component({
  selector: 'app-extended-users',
  templateUrl: './extended-users.component.html',
  styleUrls: ['./extended-users.component.css']
})
export class ExtendedUsersComponent implements OnInit, AfterViewInit {
  displayedColumns = ["id","name","email","active","lastLogin","groups","permissions","actions"];
  users: User[] = [];
  usersDataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private usersService: UsersService,
              private dialog: MatDialog) { }

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
    this.usersDataSource.sortingDataAccessor = (user: User, column: string) => {
      switch(column) {
        case "groups":
          return user.groups.map(g => g.name).join('');
        case "permissions":
          return user.groups.map(g => g.permissions).flat().join('');
        default:
          return user[column as keyof User]?.toString() || '';
      }
    }
  }

  applyFilter(event: any) {
    const filterStr = event.target.value.trim().toLowerCase();
    this.usersDataSource.filter = filterStr;
  }

  deleteUser(user: User) {
    if (user.id) {
      const dialogRef = this.dialog.open(ConfimDialogComponent, {
        data: {
          title: "Deleting user",
          question: `Do you really want to delete user ${user.name}?` 
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && user.id) {
          this.usersService.deleteUser(user.id).subscribe(success => {
            if (success) {
              this.usersDataSource.data = this.usersDataSource.data.filter(u => u.id !== user.id);
            }
          });
        }
      });
    }
  }
}
