import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable } from 'rxjs';
import {UserModel} from './models/user.model';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userEvents = new BehaviorSubject<UserModel>(undefined);

  private readonly apiUrl = 'https://ponyracer.ninja-squad.com/api/users';

  constructor(private http: HttpClient) { }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl, {login, password, birthYear});
  }
  authenticate(credentials: {login: string; password: string}): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl + '/authentication', credentials )
      .pipe(tap((user: UserModel) => this.storeLoggedInUser(user)));
  }

  storeLoggedInUser(user: UserModel): void {
  window.localStorage.setItem('rememberMe', JSON.stringify(user));
  this.userEvents.next(user);
  }

  retrieveUser(): void {
    const value = window.localStorage.getItem('rememberMe');
    if (value) {
      const user = JSON.parse(value);
      this.userEvents.next(user);
    }
  }

}
