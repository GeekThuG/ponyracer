import {Component, OnDestroy, OnInit} from '@angular/core';
import {RaceModel} from '../models/race.model';
import {RaceService} from '../race.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {PonyWithPositionModel} from '../models/pony.model';
import {filter, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {
  raceModel: RaceModel;
  id: number;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  positionSubscription: Subscription;
  error = false;
  winners: Array<PonyWithPositionModel>;
  betWon: boolean;

  constructor(private raceService: RaceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('raceId');
    this.positionSubscription = this.raceService.get(this.id).pipe(
      tap((race: RaceModel) => this.raceModel = race),
      filter(race => this.raceModel.status !== 'FINISHED'),
      switchMap(race => this.raceService.live(race.id))
    )
      .subscribe({
        next: positions => {
          this.poniesWithPosition = positions;
          this.raceModel.status = 'RUNNING';
          },
        error: () => this.error = true,
        complete: () => {
          this.raceModel.status = 'FINISHED';
          this.winners = this.poniesWithPosition.filter(pony => pony.position >= 100);
          this.betWon = this.winners.some(pony => pony.id === this.raceModel.betPonyId);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

}
