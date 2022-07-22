import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { ExtendedUsersComponent } from './extended-users/extended-users.component';
import { RegisterComponent } from './register/register.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'extended-users', component: ExtendedUsersComponent, 
   canActivate: [AuthGuard]},
  {path: 'users/edit/:id', component: UserEditComponent, data: {msg: "Hello"}, 
   canActivate: [AuthGuard]},
  {path: 'users/new', component: UserAddComponent, 
   canActivate: [AuthGuard]},
  {path: 'groups', 
   loadChildren: () => import('../modules/groups/groups.module')
                       .then(mod => mod.GroupsModule)},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'chat', component: ChatComponent},
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: '**', component: P404Component}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
