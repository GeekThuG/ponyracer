import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {JwtInterceptor} from './jwt.interceptor';
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [AppComponent, MenuComponent,
    HomeComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules}),
    ReactiveFormsModule, FormsModule, NgbModule, NgbModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useExisting: JwtInterceptor, multi: true }, NgbCollapseModule],
  bootstrap: [AppComponent]
})
export class AppModule {}

