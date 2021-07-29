import { Component, HostBinding, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

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
        alert(id + "borrado")
        this.getUsers();
      },
      err => console.log(err)
    );
  }
}
