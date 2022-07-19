import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, Subscriber } from 'rxjs';
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
//  private token = '';
  private userNameSubscriber?: Subscriber<string>;
  private get token(): string {
    return localStorage.getItem('filmsToken') || '';
  }

  private set token(value: string) {
    if (value) {
      localStorage.setItem('filmsToken', value);
    } else {
      localStorage.removeItem('filmsToken');
    }
  }

  private get userName(): string {
    return localStorage.getItem('filmsUserName') || '';
  }

  private set userName(value: string) {
    if (value) {
      localStorage.setItem('filmsUserName', value);
    } else {
      localStorage.removeItem('filmsUserName');
    }
  }

  constructor(private http: HttpClient, 
              private snackbarService: SnackbarService) { }

  loggedUser():Observable<string> {
    return new Observable((subscriber: Subscriber<string>)=> {
      this.userNameSubscriber = subscriber;
      subscriber.next(this.userName);
    });
  }

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
        this.userName = auth.name;
        this.userNameSubscriber?.next(auth.name);
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
