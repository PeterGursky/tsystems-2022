import { Pipe, PipeTransform } from '@angular/core';
import { Group } from 'src/entities/group';

@Pipe({
  name: 'groupsToString'
})
export class GroupsToStringPipe implements PipeTransform {

  transform(groups: Group[], ...args: unknown[]): string {
    // let result = '';
    // for (let group of groups) {
    //   result += group.name + ', ';
    // }
    // return result.substring(0, result.length - 2);   
    
    return groups.map(g => g.name).join(', ');    
  }

}
