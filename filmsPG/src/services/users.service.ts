import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { User } from 'src/entities/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private serverUrl = "http://localhost:8080/";
  private users = [new User("JanoService","jano@jano.sk"),
           new User("FeroService","fero@fero.sk",3, new Date(),"heslo"),
           {name: "PaťoService", email:"pato@p.sk", password: "tajne"}
          ];

  constructor(private http: HttpClient) { }

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
}
