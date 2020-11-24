import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

import { RaceModel } from './models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  private readonly apiUrl = 'https://ponyracer.ninja-squad.com/api/races';

  constructor(private http: HttpClient) {
  }

  list(): Observable<Array<RaceModel>> {
  const params = {status: 'PENDING'};
  return this.http.get<Array<RaceModel>>(this.apiUrl, {params});
  }
}
