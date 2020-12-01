import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from '../register/register.component';
import {LoginComponent} from '../login/login.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {USERS_ROUTES} from './users.routes';



@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [FormsModule, ReactiveFormsModule, RouterModule.forChild(USERS_ROUTES),
    CommonModule
  ]
})
export class UsersModule { }
