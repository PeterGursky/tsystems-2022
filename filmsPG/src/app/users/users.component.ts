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
           {name: "Paťo", email:"pato@p.sk", password: "tajne"}
          ];
  selectedUser?: User;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.users = this.usersService.getUsers();
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }
}
