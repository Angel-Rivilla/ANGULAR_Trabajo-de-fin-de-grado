import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  openUsers = false;
  menuEstados = 0;

  constructor(private authSvc: AuthService, 
              private utilsSvc: UtilsService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onExit(): void {
    this.authSvc.logout();
    this.utilsSvc.openSidebar(false);
    this.router.navigate(['']);
  }
  onNavigateAdmin() {
    this.router.navigate(['admin']);
  }
}
