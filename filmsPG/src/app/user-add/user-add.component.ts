import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/entities/user';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  constructor(private usersService: UsersService, 
              private router: Router) { }

  ngOnInit(): void {
  }

  saveUser(userToSave: User) {
    this.usersService.saveUser(userToSave).subscribe(savedUser => {
      this.router.navigateByUrl("/extended-users");
    });
  }
}
