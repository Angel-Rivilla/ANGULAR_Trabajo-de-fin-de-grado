import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { Roles, UserI, UserResponseI } from '../interface/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  public userToken = new BehaviorSubject<string | null>(null);
  
  
  loged: boolean = false;
  extraerRole: string = "";

  constructor(private http: HttpClient, private router: Router){
    this.checkToken();
  }

  get isLogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  loggedInMethod() {
    return !!localStorage.getItem('token');
  }

  getUserTokenValue(){
    return this.userToken.getValue();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole(){
    return localStorage.getItem('role');
  }

  login(authData: UserI): Observable<UserResponseI | void> {
    return this.http.post<UserResponseI>(`${environment.API_URL}/auth/login`, authData)
      .pipe(map((res:UserResponseI) => {
        this.saveToken(res.token);
        this.saveRole(res.role);
        this.extraerRole=res.role;
        console.log(this.extraerRole);
        this.loggedIn.next(true);
        this.loged = true;
        return res;
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  register(authData: UserI){
    return this.http.post<UserResponseI>(`${environment.API_URL}/users/register`, authData)
      .pipe(map((res:UserResponseI) => {
        this.saveToken(res.token);
        this.saveRole(res.role);
        this.extraerRole=res.role;
        this.loggedIn.next(true);
        this.loged = true;
        this.userToken.next(res.token);
        return res;
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.loggedIn.next(false);
    this.userToken.next(null);
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
      const userToken = localStorage.getItem('token');

      if(userToken){ 
        const isExpired = helper.isTokenExpired(userToken);
       
        if(isExpired){
          this.logout();
        } else {
          this.loggedIn.next(true);
          this.userToken.next(userToken);
        }
      }
  }


  private saveRole(role: string): void{
    localStorage.setItem('role', role);
  }

  private saveToken(token: string): void{
    localStorage.setItem('token', token);
  }

  private handlerError(err: any): Observable<never>{
    let errorMessage = 'An error ocurred retrienving data';
    if(err){
      errorMessage=`Error: code ${err.message}`;
    }
    window.alert(errorMessage);

    return throwError(errorMessage);
  }

}


