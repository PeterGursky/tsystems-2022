import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
  }
  
  get name(): FormControl<string|null> {
    return this.registerForm.get('name') as FormControl;
  }
  get email(): FormControl<string|null> {
    return this.registerForm.get('email') as FormControl;
  }
  get password(): FormControl<string|null> {
    return this.registerForm.get('password') as FormControl;
  }
  get password2(): FormControl<string|null> {
    return this.registerForm.get('password2') as FormControl;
  }
}
