import { Injectable } from '@angular/core';
import { User } from 'src/entities/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users = [new User("JanoService","jano@jano.sk"),
           new User("FeroService","fero@fero.sk",3, new Date(),"heslo"),
           {name: "PaťoService", email:"pato@p.sk", password: "tajne"}
          ];

  constructor() { }

  getUsers(){
    return this.users;
  }
}
