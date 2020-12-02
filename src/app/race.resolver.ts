import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {RaceService} from './race.service';
import {RaceModel} from './models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceResolver implements Resolve<RaceModel> {
  constructor(private raceService: RaceService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RaceModel> {
    const raceId = +route.paramMap.get('raceId');
    return this.raceService.get(raceId);
  }
}