import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserModel} from '../models/user.model';
import {Subscription} from 'rxjs';
import {UserService} from '../user.service';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy{
  navbarCollapsed = true;
  user: UserModel;
  userEventsSubscription: Subscription;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userEventsSubscription = this.userService.userEvents.subscribe(
      user => (this.user = user));
  }

  ngOnDestroy(): void {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }
  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
}
