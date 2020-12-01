import {RacesComponent} from './races.component';
import {PendingRacesComponent} from './pending-races/pending-races.component';
import {RacesResolver} from '../races.resolver';
import {FinishedRacesComponent} from './finished-races/finished-races.component';
import {BetComponent} from '../bet/bet.component';
import {RaceResolver} from '../race.resolver';
import {LiveComponent} from '../live/live.component';
import {Routes} from '@angular/router';

export const RACES_ROUTES: Routes = [
  {
    path: '', component: RacesComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pending' },
      { path: 'pending', component: PendingRacesComponent,
        resolve: { races: RacesResolver } },
      { path: 'finished', component: FinishedRacesComponent,
        resolve: { races: RacesResolver } }
    ]
  },
  { path: '', component: RacesComponent },
  { path: ':raceId', component: BetComponent,
    resolve: { race: RaceResolver } },
  { path: ':raceId/live', component: LiveComponent,
    resolve: { race: RaceResolver } }
];
