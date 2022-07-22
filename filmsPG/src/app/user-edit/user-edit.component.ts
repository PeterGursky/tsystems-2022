import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { User } from 'src/entities/user';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userId : number = 0;
  user?: User;
  
  constructor(private route: ActivatedRoute, 
              private router: Router,
              private usersService: UsersService) { }

  ngOnInit(): void {
//    this.userId = + this.route.snapshot.params["id"];  // + mení string na číslo
    this.route.paramMap.pipe(
      map(params => +(params.get("id") || "0"))
    ).subscribe(uId => {
      if (uId){
        this.userId = uId;
        this.usersService.getUser(uId).subscribe({
          next: user => this.user = user,
          complete: () => {
            if (uId !== this.user?.id) {
              this.user = undefined;
            }
          }
        });
      } else {  // if somebody enters common string to url instead of number id
        this.router.navigateByUrl("/");
      }
    });
  }

  saveUser(userToSave: User) {
    this.usersService.saveUser(userToSave).subscribe(savedUser => {
      this.user = savedUser;
    });
  }
}
