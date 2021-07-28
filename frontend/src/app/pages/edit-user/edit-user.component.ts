import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserBD } from 'src/app/interface/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  
  user: UserBD = {
    id: 0,
    username: '',
    password: '',
    role: 'reader',
    createdAt: new Date(),
    updateAt: new Date()
  };

  edit: boolean = false;

  constructor(private adminService: AdminService, 
              private router: Router, 
              private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if(params.id){
      this.adminService.getUser(params.id).
        subscribe(
          res => {
            this.user = res;
            this.edit = true;
          },
          err => console.error(err)
        )
    }
  }

  saveNewUser(){
    delete this.user.createdAt;
    delete this.user.updateAt;
    delete this.user.id;
    
    this.adminService.saveUser(this.user)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/admin']);
        },
        err => console.error(err)
      );
  }

  updateUser(){
    delete this.user.createdAt;
    delete this.user.updateAt;

    if(this.user.id != undefined){
      this.adminService.updateUser(this.user.id, this.user)
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/admin']);
          },
          err => console.error(err)
        )
    }
  }
}
