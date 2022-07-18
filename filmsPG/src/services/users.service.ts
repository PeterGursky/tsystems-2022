import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of } from 'rxjs';
import { Auth } from 'src/entities/auth';
import { User } from 'src/entities/user';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private serverUrl = "http://localhost:8080/";
  private users = [new User("JanoService","jano@jano.sk"),
           new User("FeroService","fero@fero.sk",3, new Date(),"heslo"),
           {name: "PaťoService", email:"pato@p.sk", password: "tajne", active: true, groups: []}
          ];
  private token = '';

  constructor(private http: HttpClient, 
              private snackbarService: SnackbarService) { }

  getLocalUsers(): User[]{
    return this.users;
  }

  getLocalUsers2(): Observable<User[]>{
    return of(this.users);
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.serverUrl + 'users').pipe(
      map(restUsers => restUsers.map(
                          restUser => User.clone(restUser)))
    );
  }

  getExtendedUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.serverUrl + 'users/' + this.token).pipe(
      map(restUsers => restUsers.map(
                          restUser => User.clone(restUser)))
    );
  }

  login(auth: Auth): Observable<boolean> {
    return this.http.post(this.serverUrl + 'login',auth, {responseType: 'text'}).pipe(
      map(token => {
        this.token = token;
        this.snackbarService.successMessage("User " + auth.name +" logged in");
        return true;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            console.log('http Error:', error);
            this.snackbarService.errorMessage("Wrong username or password");
            return of(false);
          }
        }
        return EMPTY;
      })
    );
  }
}
