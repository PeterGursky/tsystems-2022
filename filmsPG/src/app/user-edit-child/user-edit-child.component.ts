import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Group } from 'src/entities/group';
import { User } from 'src/entities/user';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-user-edit-child',
  templateUrl: './user-edit-child.component.html',
  styleUrls: ['./user-edit-child.component.css']
})
export class UserEditChildComponent implements OnChanges {
  hide = true;
  userForm = new FormGroup({
    name: new FormControl('', { 
                               validators: [Validators.required, Validators.minLength(3)],
                               asyncValidators: this.serverConflictValidator('name'),
                               nonNullable: true
                              }),
    email: new FormControl('', [Validators.required, 
                                Validators.email, 
                                Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")],
                               this.serverConflictValidator('email')),
    password: new FormControl('', { nonNullable: true}),
    active: new FormControl<boolean>(true, { nonNullable: true}),
    groups: new FormArray([])
  });
  allGroups: Group[] =[];
  @Input() user?: User;
  editedUser: User = new User("","");

  constructor(private usersService: UsersService) { }

  ngOnChanges(): void {
    if (this.user) {
      this.editedUser = User.clone(this.user);
    } else {
      this.editedUser = new User("","");
    }
    this.name.setValue(this.editedUser.name);
    this.email.setValue(this.editedUser.email);
    this.password.reset();
    this.active.setValue(this.editedUser.active);
    this.usersService.getGroups().subscribe(groups => {
      this.allGroups = groups;
      this.groups.clear();
      for (let group of groups) {
        if (this.editedUser.groups.some(userGroup => userGroup.id === group.id)){
          this.groups.push(new FormControl<boolean>(true, { nonNullable: true}));
        } else {
          this.groups.push(new FormControl<boolean>(false, { nonNullable: true}));
        }
      }
    });
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
      return this.userForm.get('name') as FormControl;
    }
    get email(): FormControl<string|null> {
      return this.userForm.get('email') as FormControl;
    }
    get password(): FormControl<string> {
      return this.userForm.get('password') as FormControl;
    }
    get active(): FormControl<boolean> {
      return this.userForm.get('active') as FormControl;
    }
    get groups(): FormArray {
      return this.userForm.get('groups') as FormArray;
    }
}
