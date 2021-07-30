import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  private isValidEmail = /\S*@\S*\.\S*/;
  private subscription: Subscription = new Subscription();

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  })

  constructor(private authSvc: AuthService, 
              private router: Router,
              private fb: FormBuilder,) { }

  ngOnInit(): void {
  }

  onRegister(){
    const formValue = this.registerForm.value;
    console.log(formValue);
    this.authSvc.register(formValue).subscribe(res => {
      if(res){
        this.router.navigate(['']);
      }
    })
  }

  getErrorMessage(field: string){
    let message;
    if(this.registerForm.get(field)?.errors?.required){
      message = 'You must enter a value';
    } else if(this.registerForm.get(field)?.hasError('pattern')){
      message = 'Not a valid email.';
    } else if(this.registerForm.get(field)?.hasError('minlength')){
      const minLength = this.registerForm.get(field)?.errors?.minlength.requiredLength;
      message = 'This field must be longer than ${minLength} characters';
    }

    return message;
  }

  isValidField(field: string){
    return (
      (this.registerForm.get(field)?.touched || this.registerForm.get(field)?.dirty) && 
      !this.registerForm.get(field)?.valid
    );
  }
}
