import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'login', component: LoginComponent},
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
