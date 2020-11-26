import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {UserModel} from './models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = 'https://ponyracer.ninja-squad.com/api/users';

  constructor(private http: HttpClient) { }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl, {login, password, birthYear});
  }
  authenticate(credentials: {login: string; password: string}): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl + '/authentication', credentials );
  }
}
