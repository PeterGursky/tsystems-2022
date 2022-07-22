import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsNavbarComponent } from './groups-navbar/groups-navbar.component';
import { GroupAddComponent } from './group-add/group-add.component';
import { GroupsHomeComponent } from './groups-home/groups-home.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    GroupsListComponent,
    GroupsNavbarComponent,
    GroupAddComponent,
    GroupsHomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GroupsRoutingModule
  ],
  exports: [
    GroupsListComponent
  ]
})
export class GroupsModule { }
