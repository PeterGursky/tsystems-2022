import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { User } from 'src/entities/user';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-user-edit-child',
  templateUrl: './user-edit-child.component.html',
  styleUrls: ['./user-edit-child.component.css']
})
export class UserEditChildComponent implements OnInit {
  hide = true;
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
    password: new FormControl('', { nonNullable: true})
  });
  passwordMessage = '';

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
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
}
