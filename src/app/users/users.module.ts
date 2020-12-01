import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from '../register/register.component';
import {LoginComponent} from '../login/login.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {USERS_ROUTES} from './users.routes';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [FormsModule, ReactiveFormsModule, RouterModule.forChild(USERS_ROUTES),
    CommonModule, SharedModule
  ]
})
export class UsersModule { }
