import { Component, OnInit } from '@angular/core';
import { DEFAULT_REDIRECT_AFTER_LOGIN, UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName = '';

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.loggedUser().subscribe(userName => this.userName = userName);
  }

  logout() {
    this.usersService.redirectAfterLogin = DEFAULT_REDIRECT_AFTER_LOGIN;
    this.usersService.logout();
  }
}
