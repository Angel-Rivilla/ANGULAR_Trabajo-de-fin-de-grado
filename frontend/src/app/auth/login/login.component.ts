import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  checkedInput = true;
  private isValidEmail = /\S*@\S*\.\S*/;
  private subscription: Subscription = new Subscription();

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  })

  constructor(private authSvc: AuthService, 
              private fb: FormBuilder,
              private router: Router,
              private modal: NgbModal) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    
  }

  //MODAL
  modalForgetPassword(contenido: any){
    this.modal.open(contenido, {centered: true});
  }

  modalcorrectPassword(contenido: any){
    this.modal.open(contenido, {centered: true});
  }
  
  onLogin(): void {
    if(this.loginForm.invalid){
      return;
    }

    const formValue = this.loginForm.value;
    this.subscription.add(
      this.authSvc.login(formValue).subscribe(res => {
        if(res){
          this.router.navigate(['']);
        }
      })
    );
  }

  getErrorMessage(field: string){
    let message;
    if(this.loginForm.get(field)?.errors?.required){
      message = 'You must enter a value';
    } else if(this.loginForm.get(field)?.hasError('pattern')){
      message = 'Not a valid email.';
    } else if(this.loginForm.get(field)?.hasError('minlength')){
      const minLength = this.loginForm.get(field)?.errors?.minlength.requiredLength;
      message = `This field must be longer than ${minLength} characters`;
    }

    return message;
  }

  isValidField(field: string){
    return (
      (this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty) && 
      !this.loginForm.get(field)?.valid
    );
  }
}
