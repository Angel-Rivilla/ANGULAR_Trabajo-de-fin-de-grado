import { Component, OnInit } from '@angular/core';
import { UtilsService } from './services/utils.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'frontend';
  opened = false;

  constructor(private utilsSvc: UtilsService){}

  ngOnInit(): void {
    this.utilsSvc.sidebarOpened$.subscribe(
      (res: boolean) => (this.opened = res)
    );
  }
}
