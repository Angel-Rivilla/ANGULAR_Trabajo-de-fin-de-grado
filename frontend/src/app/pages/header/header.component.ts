import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  isAdmin: string | null = null;
  
  private subscription: Subscription = new Subscription();
  private destroy$ = new Subject<any>();
  
  @Output() toggleSidenav = new EventEmitter<void>();


  constructor(public authSvc: AuthService, 
              public utilsSvc: UtilsService,
              private router: Router) { }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.authSvc.isLogged
    .pipe(takeUntil(this.destroy$))
    .subscribe((res) => (this.isLogged = res));
    
    this.authSvc.isAdmin$
    .pipe(takeUntil(this.destroy$))
    .subscribe((res) => (this.isAdmin = res));

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
    if(this.utilsSvc.toggleAdmin && this.isAdmin == 'admin'){
      this.toggleSidenav.emit();
      this.utilsSvc.toggleAdmin = false;
    }
  }

  onNavigateCart(){
    this.router.navigate(['cart']);
  }
}
