import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { User } from 'src/entities/user';
import { UsersService } from 'src/services/users.service';
import * as zxcvbn from 'zxcvbn';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;

  passwordValidator = (control: AbstractControl): ValidationErrors | null => {
    const result = zxcvbn(control.value);
    const message = "Password strength: " + result.score + " of 4 - must be 3 or 4. Guessable in " + result.crack_times_display.offline_slow_hashing_1e4_per_second;
    this.passwordMessage = message;
    return result.score < 3 ? { weakPassword: message} : null;
  }

  registerForm = new FormGroup({
    name: new FormControl('', { 
                               validators: [Validators.required, Validators.minLength(3)],
                               asyncValidators: this.serverConflictValidator('name'),
                               nonNullable: true
                              }),
    email: new FormControl('', [Validators.required, 
                                Validators.email, 
                                Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")],
                               this.serverConflictValidator('email')),
    password: new FormControl('', {
                                    validators: this.passwordValidator,
                                    nonNullable: true
                                  }),
    password2: new FormControl('')
  }, this.passwordsMatchValidator);
  passwordMessage = '';

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const password2 = control.get('password2');
    if (password?.value === password2?.value) {
      password2?.setErrors(null);
      return null;
    } else {
      const err = {"differentPasswords" : "Passwords do not match"}
      password2?.setErrors(err);
      return err;
    }
  }

  /**
   * Returns validator for name or for email depending on field.
   * @param field "name" or "email"
   */
  serverConflictValidator(field: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const username = field === 'name' ? control.value : '';
      const email = field === 'email' ? control.value : '';
      const user = new User(username, email);
      return this.usersService.userConflicts(user).pipe(
        map(conflicts => conflicts.includes(field) ? {conflict: "Value is already present on the server"} : null)
      );
    }
  } 

  onSubmit(){
    const name = this.name.value;
    const email = this.email.value || '';
    const password = this.password.value;
    const user = new User(name, email, undefined, undefined, password);
    this.usersService.registerUser(user).subscribe();
  }

  getJson(error: any): string {
    return JSON.stringify(error);
  }

  get name(): FormControl<string> {
    return this.registerForm.get('name') as FormControl;
  }
  get email(): FormControl<string|null> {
    return this.registerForm.get('email') as FormControl;
  }
  get password(): FormControl<string> {
    return this.registerForm.get('password') as FormControl;
  }
  get password2(): FormControl<string|null> {
    return this.registerForm.get('password2') as FormControl;
  }
}
