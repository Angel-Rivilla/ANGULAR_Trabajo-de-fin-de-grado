import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserBD, UserI } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  users: any = [];

  constructor(private http: HttpClient) { }

  //USERS
  getUsers(): Observable<UserI[]> {
    return this.http
    .get<UserI[]>(`${environment.API_URL}/users`);
  }

  handlerError(handlerError: any): import("rxjs").OperatorFunction<UserI[], any> {
    throw new Error('Method not implemented.');
  }

  getUser(id: string){
    return this.http.get(`${environment.API_URL}/users/${id}`);
  }

  deleteUser(id: string){
    return this.http.delete(`${environment.API_URL}/users/${id}`);
  }

  saveUser(user: UserBD){
    return this.http.post(`${environment.API_URL}/users`, user);
  }

  updateUser(id: number, updateUser: UserBD) {
    return this.http.patch(`${environment.API_URL}/users/${id}`, updateUser);
  }
}
