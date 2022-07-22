import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupAddComponent } from './group-add/group-add.component';
import { GroupsHomeComponent } from './groups-home/groups-home.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsNavbarComponent } from './groups-navbar/groups-navbar.component';

const routes: Routes = [
  { path: 'groups', 
    component: GroupsNavbarComponent,
    children: [
      {path: 'list', component: GroupsListComponent},
      {path: 'add', component: GroupAddComponent},
      {path: '', component: GroupsHomeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
