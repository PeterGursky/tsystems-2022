import { Pipe, PipeTransform } from '@angular/core';
import { Group } from 'src/entities/group';

@Pipe({
  name: 'groupsToString'
})
export class GroupsToStringPipe implements PipeTransform {

  transform(groups: Group[], param?: string): string {
    if (param === 'perm') {
      let perms = groups.map(g => g.permissions).flat();
      return perms.join(', ');
    }
    return groups.map(g => g.name).join(', ');    
  }

}
