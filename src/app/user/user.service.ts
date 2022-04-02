import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { IBase } from '../interfaces/base';

export interface CreateUserDto { 
  name: string,
  username: string, 
  email: string, 
  password: string,
  address: string,
  phone: string
}

export interface IUser extends IBase{
  name: string,
  username: string,
  email: string,
  password: string,
  address: string,
  phone:string
}

@Injectable(
  // providedIn: 'root'
)
export class UserService {
  
  currentUser!: IUser;
  // console.log(apiUrl);
  

  get isLogged() {
    return !!this.currentUser;
  }

  constructor(private httpClient: HttpClient) {
    console.log('UserService#constructor')
  }

    // getUser$(): Observable<IUser[]>{
    //   return this.httpClient.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
    // }

  login$(userData: { username: string, password: string }): Observable<IUser> {
      return this.httpClient
        .post<IUser>(`${environment.apiUrl}/auth/login`, userData, { withCredentials: true, observe: 'response' })
        .pipe(
          tap(response => console.log(response)),
          map(response => response.body),
          tap(user => this.currentUser = user)
        )
        
      }
      
      register$(userData: CreateUserDto): Observable<IUser> {
      // console.log(environment.apiUrl);
      return this.httpClient.post<IUser>(`${environment.apiUrl}/auth/register`, userData, { withCredentials: true })
    }

    getProfile$(): Observable<IUser> {
      return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true })
        .pipe(tap(user => this.currentUser = user))
    }
}

