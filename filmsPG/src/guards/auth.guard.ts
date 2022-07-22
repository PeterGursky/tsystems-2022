import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/services/snackbar.service';
import { UsersService } from 'src/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private usersService: UsersService,
              private router: Router,
              private snackbarService: SnackbarService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.usersService.loggedIn()) {
        return true;
      }
      this.usersService.redirectAfterLogin = state.url;
      this.snackbarService.errorMessage("You need to be logged in to access this page");
      this.router.navigateByUrl("/login");
      return false;
  }
  
}
