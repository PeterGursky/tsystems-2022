import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/entities/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth = new Auth();

  constructor() { }

  ngOnInit(): void {
  }

}
