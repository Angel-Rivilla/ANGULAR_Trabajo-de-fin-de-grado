import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isLogged = false;
  helpOpen = false;
  
  private subscription: Subscription = new Subscription();
  
  @Output() toggleSidenav = new EventEmitter<void>();


  constructor(public authSvc: AuthService, 
              public utilsSvc: UtilsService,
              private router: Router) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.authSvc.isLogged.subscribe((res) => (this.isLogged = res))
    );

  }

  onToggleSidenav(): void{
    if(this.utilsSvc.toggleAdmin == false){
      this.toggleSidenav.emit();
      this.utilsSvc.toggleAdmin = true;
    } else {
      this.router.navigate(['']);
      this.toggleSidenav.emit();
      this.utilsSvc.toggleAdmin = false;
    }
    
  }

  onLogout(): void{
    this.authSvc.logout();
    if(this.utilsSvc.toggleAdmin && this.authSvc.extraerRole == 'admin'){
      this.toggleSidenav.emit();
      this.utilsSvc.toggleAdmin = false;
    }
  }

  onNavigateCart(){
    this.router.navigate(['cart']);
  }
}
