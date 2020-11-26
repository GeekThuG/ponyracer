import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';


@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = { login: '', password: '' };
  authenticationFailed = false;

  constructor(private userService: UserService, private readonly router: Router) { }

  ngOnInit(): void {
  }

  authenticate(): void {
    this.userService.authenticate(this.credentials).pipe(
      tap(() => this.router.navigate(['/'])),
      catchError(({error}) => {
        this.authenticationFailed = true;
        console.log(error);
        return of();
      })
    ).subscribe();
  }
}
