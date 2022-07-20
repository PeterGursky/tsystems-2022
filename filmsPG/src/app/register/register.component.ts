import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as zxcvbn from 'zxcvbn';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, 
                                Validators.email, 
                                Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]),
    password: new FormControl('', this.passwordValidator),
    password2: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const result = zxcvbn(control.value);
    const message = "Password strength: " + result.score + " of 4 - must be 3 or 4. Guessable in " + result.crack_times_display.offline_slow_hashing_1e4_per_second;

    return result.score < 3 ? { weakPassword: message} : null;
  }

  onSubmit(){
  }

  getJson(error: any): string {
    return JSON.stringify(error);
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
