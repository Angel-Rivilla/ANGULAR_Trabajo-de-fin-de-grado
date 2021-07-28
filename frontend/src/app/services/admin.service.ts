import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserBD, UserI } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  users: any = [];

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${environment.API_URL}/users`);
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
