import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pr-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Output() readonly closed = new EventEmitter<void>();
  @Input() type = 'warning';
  @Input() dismissible = true;

  constructor() { }

  ngOnInit(): void {
  }

  closeHandler(): void {
  this.closed.emit();
  }

  get alertClasses(): string {
    return `alert alert-${this.type}`;
  }
}
