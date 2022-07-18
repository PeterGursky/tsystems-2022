import { Group } from "./group";

export class User {
  static clone(u: User):User {
    return new User(u.name, u.email, u.id, u.lastLogin, u.password, u.active, 
          u.groups.map(userGroup => Group.clone(userGroup)));
  }

  constructor(
    public name: string,
    public email: string,
    public id?: number,
    public lastLogin?: Date,
    public password = '',
    public active = true,
    public groups: Group[] = []
  ){}

  public toString() {
    return this.name + ", email=" + this.email;
  }
}