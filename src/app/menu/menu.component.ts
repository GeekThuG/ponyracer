import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserModel} from '../models/user.model';
import {EMPTY, of, concat, Subscription} from 'rxjs';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {catchError, switchMap} from 'rxjs/operators';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy{
  navbarCollapsed = true;
  user: UserModel;
  userEventsSubscription: Subscription;

  constructor(private userService: UserService, private readonly router: Router) {}
  ngOnInit(): void {
    this.userEventsSubscription = this.userService.userEvents.pipe(
      switchMap(user => (user ? concat(of(user),
        this.userService.scoreUpdates(user.id).pipe(
          catchError(() => EMPTY))) : of(null)))).subscribe(
            userWithScore => (this.user = userWithScore));
  }

  ngOnDestroy(): void {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }
  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(event: Event): void {
    this.userService.logout();
    this.router.navigate(['/']);
    event.preventDefault();
  }
}
