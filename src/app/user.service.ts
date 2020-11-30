import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable } from 'rxjs';
import {UserModel} from './models/user.model';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {JwtInterceptor} from './jwt.interceptor';
import {WsService} from './ws.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userEvents = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: HttpClient,
              private jwtInterceptor: JwtInterceptor,
              private wsService: WsService ) { }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    return this.http.post<UserModel>(environment.baseUrl + '/api/users', {login, password, birthYear});
  }
  authenticate(credentials: {login: string; password: string}): Observable<UserModel> {
    return this.http.post<UserModel>(environment.baseUrl + '/api/users/authentication', credentials )
      .pipe(tap((user: UserModel) => this.storeLoggedInUser(user)));
  }

  storeLoggedInUser(user: UserModel): void {
  window.localStorage.setItem('rememberMe', JSON.stringify(user));
  this.userEvents.next(user);
  this.jwtInterceptor.setJwtToken(user.token);
  }

  retrieveUser(): void {
    const value = window.localStorage.getItem('rememberMe');
    if (value) {
      const user = JSON.parse(value);
      this.userEvents.next(user);
      this.jwtInterceptor.setJwtToken(user.token);
    }
  }
  logout(): void {
    this.userEvents.next(null);
    localStorage.removeItem('rememberMe');
    this.jwtInterceptor.removeJwtToken();
  }

  scoreUpdates(userId: number): Observable<UserModel> {
    return this.wsService.connect<UserModel>( '/player/' + userId);
  }

  isLoggedIn(): boolean {
    return !!window.localStorage.getItem('rememberMe');
  }

}
