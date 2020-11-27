import { Injectable } from '@angular/core';
import {interval, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import { RaceModel } from './models/race.model';
import {environment} from '../environments/environment';
import {PonyWithPositionModel} from './models/pony.model';
import {map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RaceService {


  constructor(private http: HttpClient) {
  }

  list(): Observable<Array<RaceModel>> {
  const params = {status: 'PENDING'};
  return this.http.get<Array<RaceModel>>(environment.baseUrl + '/api/races', {params});
  }

  bet(raceId: number, ponyId: number): Observable<RaceModel> {
    return this.http.post<RaceModel>(environment.baseUrl + '/api/races/' + raceId + '/bets', {ponyId});
  }
  get(id: number): Observable<RaceModel> {
    return this.http.get<RaceModel>(environment.baseUrl + '/api/races/' + id);
  }

  cancelBet(raceId: number): Observable<RaceModel> {
    return this.http.delete<RaceModel>(environment.baseUrl + '/api/races/' + raceId + '/bets');
  }

  live(id: number): Observable<Array<PonyWithPositionModel>> {
    return interval(1000).pipe(
      take(101),
      map(position => {
        return [
          {
            id: 1,
            name: 'Superb Runner',
            color: 'BLUE',
            position
          },
          {
            id: 2,
            name: 'Awesome Fridge',
            color: 'GREEN',
            position
          },
          {
            id: 3,
            name: 'Great Bottle',
            color: 'ORANGE',
            position
          },
          {
            id: 4,
            name: 'Little Flower',
            color: 'YELLOW',
            position
          },
          {
            id: 5,
            name: 'Nice Rock',
            color: 'PURPLE',
            position
          }
        ];
      })
    );
  }
}
