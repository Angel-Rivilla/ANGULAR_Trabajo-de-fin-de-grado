import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserBD } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';


//*ngIf = "authSvc.loged && authSvc.extraerRole == 'admin'"
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  toggleAdmin = false;

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(public authSvc: AuthService) { }

  ngOnInit(): void {
  }

  isAdmin(user: UserBD): boolean{
    if(user.role == 'admin'){
      return true;
    } else {
      return false;
    }
  }

  onToggleSidenav(): void{
    this.toggleSidenav.emit();
  }

  onLogout(): void{
    this.authSvc.logout();
    this.authSvc.loged = false;
  }

}
