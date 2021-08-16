import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { ScriptService } from 'src/app/services/script.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private isValidEmail = /\S*@\S*\.\S*/;
  isLogged = false;
  helpOpen = false;
  openAndExit = false;
  isAdmin: string | null = null;
  loginModal = 1;
  registerModal = 0;
  input_password: any;

  passwordForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(this.isValidEmail)]]
  })
  
  private subscription: Subscription = new Subscription();
  private destroy$ = new Subject<any>();
  
  @Output() toggleSidenav = new EventEmitter<void>();


  constructor(public authSvc: AuthService, 
              public utilsSvc: UtilsService,
              private router: Router,
              private modal: NgbModal,
              private scriptSvc: ScriptService,
              private fb: FormBuilder) { }

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
      this.router.navigate(['admin']);
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

  mLogin(contenido: any){
    this.scriptSvc.loadScript('assets/js/login-modal.js');
    this.modal.open(contenido, {size:'lg'});
  }

  modalForgetPassword(contenido: any){
    this.scriptSvc.loadScript('assets/js/login-modal.js');
    this.modal.open(contenido, {centered: true});
  }

  modalcorrectPassword(contenido: any){
    this.modal.open(contenido, {centered: true});
  }

  changePassword(){
    const formValue = this.passwordForm.value;
    
    this.subscription.add(
      this.authSvc.forgotPassword(formValue)
        .subscribe(
          res => {
            console.log(res);
          },
          err => console.error(err)
        )
      );
  }
}
