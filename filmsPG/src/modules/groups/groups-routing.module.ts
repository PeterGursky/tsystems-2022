import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';
import { ResolveGroupService } from 'src/guards/resolve-group.service';
import { GroupAddComponent } from './group-add/group-add.component';
import { GroupsHomeComponent } from './groups-home/groups-home.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsNavbarComponent } from './groups-navbar/groups-navbar.component';

const routes: Routes = [
  { path: 'groups', 
    component: GroupsNavbarComponent,
    children: [
      {path: 'list', component: GroupsListComponent,
       resolve: {
        groups: ResolveGroupService
       }
      },
      {path: 'add', component: GroupAddComponent, canActivate: [AuthGuard]},
      {path: '', component: GroupsHomeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
