import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { UserI, UserResponseI } from '../interface/user';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(private http: HttpClient){ }

  login(authData: UserI): Observable<UserResponseI | void> {
    return this.http.post<UserResponseI>(`${environment.API_URL}/auth/login`, authData)
      .pipe(map((res:UserResponseI) => {
        this.saveToken(res.token);
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  logout(): void{
    localStorage.removeItem('token');
    // set userIsLogged = false
  }

  private checkToken(): void {
      
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
