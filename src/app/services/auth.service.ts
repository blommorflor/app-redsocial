import { Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../interfaces/userlogin.interface';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/loginResponse.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = environment.URL_API;

  constructor(private http: HttpClient) {}

  login(data: UserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/auth/login`, data);
  }

  register(data: User): Observable<User>{
    return this.http.post<User>(`${this.url}/auth/register`, data);
  }
}
