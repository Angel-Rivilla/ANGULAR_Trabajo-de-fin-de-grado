import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit, OnDestroy {

  hide = true;
  user$: string | null | undefined;
  token$: string | null | undefined;

  passwordResetForm = this.fb.group({
    newPassword: ['']
  })

  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private authSvc: AuthService,
              private router: Router) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.authSvc.usernameLogged.subscribe((res) => (this.user$ = res))
    this.authSvc.isAdmin$.subscribe((res) => (this.token$ = res))
  }

  onPassword(){
    const formValue = this.passwordResetForm.value;
    this.subscription.add(
      this.authSvc.changePassword(formValue)
        .subscribe(
          res => {
            console.log(res);
            alert('Password changed');
            this.router.navigate(['/login']);
          },
          err => console.error(err)
        )
    );
  }
}
