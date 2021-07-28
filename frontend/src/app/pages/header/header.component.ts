import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

//*ngIf = "authSvc.loged && authSvc.extraerRole == 'admin'"
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(public authSvc: AuthService) { }

  ngOnInit(): void {
  }

  onLogout(): void{
    this.authSvc.logout();
    this.authSvc.loged = false;
  }

}
