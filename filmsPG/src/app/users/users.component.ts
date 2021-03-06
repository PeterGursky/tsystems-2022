import { Component, OnInit } from '@angular/core';
import { User } from 'src/entities/user';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [new User("Jano","jano@jano.sk"),
           new User("Fero","fero@fero.sk",3, new Date(),"heslo"),
           {name: "Paťo", email:"pato@p.sk", password: "tajne", active: true, groups: []}
          ];
  selectedUser?: User;
  displayedColumns = ["id","name","email"];
  errorText = "";

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
//    this.users = this.usersService.getLocalUsers();
    this.usersService.getUsers().subscribe({
      next: u => this.users = u,
      error: err => this.errorText = "Server not available!"
    });
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }
}
