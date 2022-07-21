import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { P404Component } from './p404/p404.component';
import { MaterialModule } from '../modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ExtendedUsersComponent } from './extended-users/extended-users.component';
import { GroupsToStringPipe } from '../pipes/groups-to-string.pipe';
import { RegisterComponent } from './register/register.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    P404Component,
    NavbarComponent,
    ExtendedUsersComponent,
    GroupsToStringPipe,
    RegisterComponent,
    ConfirmDialogComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
