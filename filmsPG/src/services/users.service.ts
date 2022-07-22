import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, mapTo, Observable, of, Subscriber, tap } from 'rxjs';
import { Auth } from 'src/entities/auth';
import { Group } from 'src/entities/group';
import { User } from 'src/entities/user';
import { SnackbarService } from './snackbar.service';

export const DEFAULT_REDIRECT_AFTER_LOGIN = "/extended-users";

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
  public redirectAfterLogin = DEFAULT_REDIRECT_AFTER_LOGIN;

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
    this.userNameSubscriber?.next(value);
    if (value) {
      localStorage.setItem('filmsUserName', value);
    } else {
      localStorage.removeItem('filmsUserName');
    }
  }

  constructor(private http: HttpClient, 
              private snackbarService: SnackbarService,
              private router: Router) { }

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
                          restUser => User.clone(restUser))),
      catchError(error => this.processHttpError(error))
    );
  }

  getExtendedUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.serverUrl + 'users/' + this.token).pipe(
      map(restUsers => restUsers.map(
                          restUser => User.clone(restUser))),
      catchError(error => this.processHttpError(error))
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.serverUrl + 'user/' + id + '/' + this.token).pipe(
      map(restUser => User.clone(restUser)),
      catchError(error => this.processHttpError(error))
    );
  }

  login(auth: Auth): Observable<boolean> {
    return this.http.post(this.serverUrl + 'login',auth, {responseType: 'text'}).pipe(
      map(token => {
        this.token = token;
        this.userName = auth.name;
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

  logout() {
    if (this.token) {
      this.http.get(this.serverUrl + 'logout/' + this.token).pipe(
        catchError(error => this.processHttpError(error))
      ).subscribe();
      this.userName = '';
      this.token = '';
    }
    this.router.navigateByUrl('/login');
  }

  userConflicts(user: User): Observable<string[]> {
    return this.http.post<string[]>(this.serverUrl+'user-conflicts', user).pipe(
      catchError(error => this.processHttpError(error))
    );
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.serverUrl + "register", user).pipe(
      tap(savedUser=> {
        this.snackbarService.successMessage("Registration successfull, please log in");
        this.router.navigateByUrl("/login");
      }),
      catchError(error => this.processHttpError(error))
    );
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.serverUrl + "users/" + this.token, user).pipe(
      tap(savedUser => this.snackbarService.successMessage("User saved with id " + savedUser.id)),
      catchError(error => this.processHttpError(error))
    )
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete(this.serverUrl + "user/" + userId + "/" + this.token).pipe(
      map(() => true),
      catchError(error => this.processHttpError(error)) 
    )
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.serverUrl + "groups").pipe(
      map(restGroups => restGroups.map(gr => Group.clone(gr))),
      catchError(error => this.processHttpError(error))
    )
  }

  //not secure version
  loggedIn(): boolean {
    return !!this.token;
  }

  processHttpError(error: any): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.snackbarService.errorMessage("Server down");
      } else {
        if (error.status < 500) { //client error
          const message = error.error.errorMessage || JSON.parse(error.error).errorMessage;
          this.snackbarService.errorMessage(message);
        } else { // server error
          this.snackbarService.errorMessage("Server error, please contact administrator.");
          console.error(error);
        }
      }
    } else {
      console.error(error);
    }
    return EMPTY;
  }
}
