import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { UserI, UserReset, UserResponseI} from '../interface/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  modal: NgbModalRef | undefined;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userToken = new BehaviorSubject<string | null>(null);
  private usernameIn = new BehaviorSubject<string | null>(null);
  private roleIn = new BehaviorSubject<string | null>(null);
  private tokenIn = new BehaviorSubject<string | null>(null);
  

  tokenRefresh = "";
  loged: boolean = false;

  constructor(private http: HttpClient, 
              private router: Router){
    this.checkToken();
  }

  get isLogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  get usernameLogged(): Observable<string | null> {
    return this.usernameIn.asObservable();
  }

  get isAdmin$(): Observable<string | null>{
    return this.roleIn.asObservable();
  }

  get isToken$(): Observable<string | null>{
    return this.tokenIn.asObservable();
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

  getTokenReset(){
    return localStorage.getItem('resetToken');
  }

  getRole(){
    return localStorage.getItem('role');
  }

  login(authData: UserI): Observable<UserResponseI | void> {
    return this.http.post<UserResponseI>(`${environment.API_URL}/auth/login`, authData)
      .pipe(map((res:UserResponseI) => {
        this.saveLocalStorage(res.token,res.role,authData.username);
        this.loggedIn.next(true);
        this.usernameIn.next(authData.username);
        this.roleIn.next(res.role);
        console.log(this.usernameIn);
        this.loged = true;
        return res;
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  register(authData: UserI){
    return this.http.post<UserResponseI>(`${environment.API_URL}/users/register`, authData)
      .pipe(map((res:UserResponseI) => {
        this.saveLocalStorage(res.token,res.role,authData.username);
        this.loggedIn.next(true);
        this.loged = true;
        this.userToken.next(res.token);
        this.usernameIn.next(authData.username);
        this.roleIn.next(res.role);
        return res;
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    localStorage.removeItem('resetToken');
    this.loggedIn.next(false);
    this.userToken.next(null);
    this.usernameIn.next(null);
    this.tokenIn.next(null);
    this.roleIn.next(null);
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
      const userToken = localStorage.getItem('token');
      const role:string | null = localStorage.getItem('role');
      const userLogged = localStorage.getItem('user');

      if(userToken){ 
        const isExpired = helper.isTokenExpired(userToken);
       
        if(isExpired){
          this.logout();
        } else {
          this.loggedIn.next(true);
          this.userToken.next(userToken);
          this.roleIn.next(role);
          this.usernameIn.next(userLogged);
        }
      }
  }

  private saveLocalStorage(token: string, role: string, user: string): void{
    localStorage.setItem('token', token); 
    localStorage.setItem('role', role);
    localStorage.setItem('user', user);
  }

  private saveResetToken(resetToken: string): void{
    localStorage.setItem('resetToken', resetToken);
  }

  private handlerError(err: any): Observable<never>{
    let errorMessage = 'An error ocurred retrienving data';
    if(err){
      errorMessage=`Error: code ${err.message}`;
    }
    window.alert(errorMessage);

    return throwError(errorMessage);
  }

  //Llamadas http
  forgotPassword(username: string){
    return this.http.put<UserReset>(`${environment.API_URL}/auth/forgot-password/`, username)
    .pipe(map((res:UserReset) => {
      if(res.user.resetToken) { 
        this.tokenIn.next(res.user.resetToken) 
        this.saveResetToken(res.user.resetToken);
      }
      return res;
    }),
    catchError((err) => this.handlerError(err))
  );
  }

  changePassword(newPassword: string){
    return this.http.put(`${environment.API_URL}/auth/new-password/`, newPassword)
    .pipe(map(res => {
      return res;
    }),
    catchError((err) => this.handlerError(err))
  );
  }
  
  refreshToken(updateUser: UserResponseI){
    return this.http.post(`${environment.API_URL}/auth/refresh-token/`, updateUser);
  }

}


