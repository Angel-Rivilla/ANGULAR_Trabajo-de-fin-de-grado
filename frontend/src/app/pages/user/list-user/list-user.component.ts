import { Component, HostBinding, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  usersOpen= true;
  @HostBinding('class') classes = 'row';

  users: any = [];
  totalUsers = 0;

  constructor(private userSvc: UserService) { }
  
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userSvc.getUsers().subscribe(
      res => {
        this.users = res;
        this.totalUsers = res.length;
      },
      err=> console.error(err)
    );
    
  }

  deleteUser(id: string){
    this.userSvc.deleteUser(id).subscribe(
      res => {
        console.log(res);
        alert(id + "borrado")
        this.getUsers();
      },
      err => console.log(err)
    );
  }
}
