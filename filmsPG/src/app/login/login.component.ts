import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/entities/auth';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth = new Auth("Peter", "upjs");
  hide = true;
  
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  getAuth() {
    return JSON.stringify(this.auth);
  }

  onSubmit() {
    this.usersService.login(this.auth).subscribe(token => console.log('token:', token));
  }
}
