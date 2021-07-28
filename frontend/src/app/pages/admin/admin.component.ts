import { Component, HostBinding, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  users: any = [];

  constructor(private adminService: AdminService) { }
  
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.adminService.getUsers().subscribe(
      res => {
        this.users = res;
        console.log(res);
      },
      err=> console.error(err)
    );
  }

  deleteUser(id: string){
    this.adminService.deleteUser(id).subscribe(
      res => {
        console.log(res);
        this.getUsers();
      },
      err => console.log(err)
    );
  }
}
