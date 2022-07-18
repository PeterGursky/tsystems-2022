import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/entities/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth = new Auth("Peter", "upjs");
  hide = true;
  
  constructor() { }

  ngOnInit(): void {
  }

  getAuth() {
    return JSON.stringify(this.auth);
  }

  onSubmit() {
    console.log("Submit");
  }
}
