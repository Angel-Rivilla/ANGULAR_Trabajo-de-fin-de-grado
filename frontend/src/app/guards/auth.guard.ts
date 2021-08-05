import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(): boolean {
    if(this.authService.loggedInMethod() && this.authService.getRole() == 'admin'){
      return true;
    } else {
      if(!this.authService.loggedInMethod()) {
        this.router.navigate(['/login'])
      } else {
        this.router.navigate(['/'])
      }
      return false;
    }
  } 
}
