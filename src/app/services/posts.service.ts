import { Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from '../interfaces/userlogin.interface';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/loginResponse.interface';
import { Post } from '../interfaces/posts.interface';
import { Affect } from '../interfaces/affect.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url: string = environment.URL_API;
  private token: string|null = localStorage.getItem('JWT');

  constructor(private http: HttpClient) {}

  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });


  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/posts`, { headers: this.headers });
  }

  createPost(data: Post): Observable<Post>{
    return this.http.post<Post>(`${this.url}/posts`, data, { headers: this.headers });
  }

  updatePost(id: number, data: Post): Observable<Affect>{
    return this.http.patch<Affect>(`${this.url}/posts/${id}`, data, { headers: this.headers });
  }

  deletePost(id: number): Observable<Affect>{
    return this.http.delete<Affect>(`${this.url}/posts/${id}`, { headers: this.headers });
  }

  /**
   * This function is used to liked a post
   * @param id
   */
  likePost(id: number): Observable<Affect>{
    return this.http.patch<Affect>(`${this.url}/posts/like/${id}`, {}, { headers: this.headers });
  }
}
