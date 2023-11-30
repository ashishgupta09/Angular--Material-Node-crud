import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../models/base-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(this.apiUrl);
  }

  getUserById(id: string): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(this.apiUrl, user);
  }

  updateUser(id: string, user: User): Observable<BaseResponse> {
    return this.http.put<BaseResponse>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<BaseResponse> {
    return this.http.delete<BaseResponse>(`${this.apiUrl}/${id}`);
  }
}
