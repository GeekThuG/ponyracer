import {Component, OnDestroy, OnInit} from '@angular/core';
import {RaceModel} from '../models/race.model';
import {RaceService} from '../race.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {PonyWithPositionModel} from '../models/pony.model';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {
  raceModel: RaceModel;
  id: number;
  poniesWithPosition: Array<PonyWithPositionModel>;
  positionSubscription: Subscription;

  constructor(private raceService: RaceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('raceId');
    this.raceService.get(this.id).subscribe(raceModel => (this.raceModel = raceModel));
    this.positionSubscription = this.raceService.live(this.id).subscribe(
      positions => (this.poniesWithPosition = positions));
  }

  ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

}
