import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged = false;
  user$: string | null | undefined;
  constructor(public authSvc: AuthService) {
    
  }

  ngOnInit(): void {
    this.authSvc.isLogged.subscribe((res) => (this.isLogged = res))
    this.authSvc.usernameLogged.subscribe((res) => (this.user$ = res))
    console.log(this.user$);
  }
}
