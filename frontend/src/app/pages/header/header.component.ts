import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
