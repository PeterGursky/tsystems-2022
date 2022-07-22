import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(private usersService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
  }

  getAuth() {
    return JSON.stringify(this.auth);
  }

  onSubmit() {
    this.usersService.login(this.auth).subscribe(loginOk => {
      if (loginOk) {
        // idem do autorizovanej zóny
        this.router.navigateByUrl(this.usersService.redirectAfterLogin);
      } else {
        // vypíšem, že zlé heslo
      }
    });
  }
}
