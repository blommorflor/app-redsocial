import { Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from '../interfaces/userlogin.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = environment.URL_API;
  private token: string | null = localStorage.getItem('JWT');

  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  constructor(private http: HttpClient) {}

  updateUser(id: number, data: UserLogin): Observable<UserLogin> {
    return this.http.patch<UserLogin>(`${this.url}/users/${id}`, data, {
      headers: this.headers,
    });
  }
}
