export class Group {
  static clone(group: Group) {
    return new Group(group.name, group.id, [...group.permissions]);
  }

  constructor(
    public name: string,
    public id?: number,
    public permissions: string[] = []
  ){}
}