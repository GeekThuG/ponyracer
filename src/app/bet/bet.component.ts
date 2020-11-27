import {Component, Input, OnInit} from '@angular/core';
import {RaceModel} from '../models/race.model';
import {ActivatedRoute} from '@angular/router';
import {RaceService} from '../race.service';
import {PonyModel} from '../models/pony.model';


@Component({
  selector: 'pr-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {
 @Input() raceModel: RaceModel;
  betFailed = false;

  constructor(private route: ActivatedRoute, private raceService: RaceService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('raceId');
    this.raceService.get(id).subscribe(raceModel => (this.raceModel = raceModel));
  }

  betOnPony(pony: PonyModel): void {
    if (!this.isPonySelected(pony)) {
      this.raceService.bet(this.raceModel.id, pony.id)
        .subscribe(raceModel => this.raceModel = raceModel,
          error1 => {
            this.betFailed = true;
          });
    }
    else {
      this.raceService.cancelBet(this.raceModel.id).subscribe({
        next: () => this.raceModel.betPonyId = null,
        error: () => {
        this.betFailed = true;
      }
      });
    }

  }

  isPonySelected(pony: PonyModel): boolean {
  if (this.raceModel.betPonyId === pony.id) {
    return true;
  }
  return false;
  }
}
