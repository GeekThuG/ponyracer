import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RacesComponent} from './races.component';
import {RaceComponent} from '../race/race.component';
import {PendingRacesComponent} from './pending-races/pending-races.component';
import {FinishedRacesComponent} from './finished-races/finished-races.component';
import {PonyComponent} from '../pony/pony.component';
import {BetComponent} from '../bet/bet.component';
import {LiveComponent} from '../live/live.component';
import {FromNowPipe} from '../from-now.pipe';
import {RouterModule} from '@angular/router';
import {RACES_ROUTES} from './races.routes';



@NgModule({
  declarations: [RacesComponent, RaceComponent,
    PendingRacesComponent, FinishedRacesComponent,
    PonyComponent, BetComponent, LiveComponent, FromNowPipe],
  imports: [RouterModule.forChild(RACES_ROUTES),
    CommonModule
  ]
})
export class RacesModule { }
