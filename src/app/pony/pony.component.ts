import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent implements OnInit {
  @Input() ponyModel: PonyModel;
  @Output() readonly ponyClicked = new EventEmitter<PonyModel>();
  @Input() isRunning: boolean;

  constructor() {}

  ngOnInit(): void {}

  getPonyImageUrl(): string {
    return `assets/images/pony-${this.ponyModel.color.toLowerCase()}${this.isRunning ? '-running' : ''}.gif`;
  }
  clicked(): void {
    this.ponyClicked.emit(this.ponyModel);
  }
}
