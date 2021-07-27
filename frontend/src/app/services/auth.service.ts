import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { UserI, UserResponseI } from '../interface/user';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loged: boolean = false;

  constructor(private http: HttpClient){
    this.checkToken();
  }

  get isLogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  login(authData: UserI): Observable<UserResponseI | void> {
    return this.http.post<UserResponseI>(`${environment.API_URL}/auth/login`, authData)
      .pipe(map((res:UserResponseI) => {
        this.saveToken(res.token);
        this.loggedIn.next(true);
        this.loged = true;
        return res;
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  logout(): void{
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  private checkToken(): void {
      const userToken = localStorage.getItem('token');
      if(userToken){ 
        const isExpired = helper.isTokenExpired(userToken);
        console.log('isExpired ->', isExpired);
        //isExpired ? this.logout() : this.loggedIn.next(true);
        if(isExpired){
          this.logout();
        } else {
          this.loggedIn.next(true);
        }
      }
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
