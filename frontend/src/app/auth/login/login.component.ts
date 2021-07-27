import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    const userData = {
      username: 'Angel_Rivilla',
      password: 'Admin688700020'
    };
    this.authSvc.login(userData).subscribe(res => console.log('Login'));
  }

}
