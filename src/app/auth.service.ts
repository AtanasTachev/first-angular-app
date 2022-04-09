import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './core/interfaces/user';
import { CreateUserDto } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser = new BehaviorSubject<IUser>(undefined!);

  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));


  constructor(private httpClient: HttpClient) { }

  login$(userData: { username: string, password: string }): Observable<IUser | null> {
    return this.httpClient
      .post<IUser>(`${environment.apiUrl}/auth/login`, userData, { withCredentials: true, observe: 'response' })
      .pipe(
        map(response => response.body),
      )
  }

  logout$(): Observable<void> {
    return this.httpClient
      .post<void>(`${environment.apiUrl}/auth/logout`, {}, { withCredentials: true })
  }

  register$(userData: CreateUserDto): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiUrl}/auth/register`, userData, { withCredentials: true })
  }

  // authenticate(): Observable<IUser> {
  //   return this.httpClient
  //     .get<IUser>(`${environment.apiUrl}/auth/profile`, { withCredentials: true })
  //     .pipe(tap(currentProfile => this.handleLogin(currentProfile)), catchError((err) => {
  //       return EMPTY;
  //     }))
  // }

  handleLogin(newUser: IUser) {
    this._currentUser.next(newUser);
  }

  handleLogout() {
    this._currentUser.next(undefined!);
  }    
}
