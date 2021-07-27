import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    username: [''],
    password: [''],
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
}
