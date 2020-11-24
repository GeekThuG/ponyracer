import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RacesComponent } from './races/races.component';
import { RaceComponent } from './race/race.component';
import {PonyComponent} from './pony/pony.component';
import { FromNowPipe } from './from-now.pipe';



@NgModule({
  declarations: [AppComponent, MenuComponent, RacesComponent, RaceComponent, PonyComponent, FromNowPipe],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
