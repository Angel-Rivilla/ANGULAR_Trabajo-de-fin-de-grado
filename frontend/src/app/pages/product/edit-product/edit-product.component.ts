import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductI } from 'src/app/interface/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  
  product: ProductI = {
    id: 0,
    title: '',
    description: '',
    price: '',
    image: '',
    createdUser: '',
    createdAt: new Date(),
    updateAt: new Date()
  };

  edit: boolean = false;

  isLogged = false;
  user$: string | null | undefined;

  constructor(private productSvc: ProductService,
              private router: Router, 
              private activedRoute: ActivatedRoute,
              private authSvc: AuthService) { }

  ngOnInit(): void {
    this.authSvc.usernameLogged.subscribe((res) => (this.user$ = res))
    this.authSvc.isLogged.subscribe((res) => (this.isLogged = res))

    const params = this.activedRoute.snapshot.params;
    if(params.id){
      this.productSvc.getProduct(params.id).
        subscribe(
          res => {
            this.product = res;
            this.edit = true;
          },
          err => console.error(err)
        )
    }
  }

  saveNewProduct(){
    delete this.product.createdAt;
    delete this.product.updateAt;
    delete this.product.id;
    this.product.createdUser= this.user$;

    this.productSvc.saveProduct(this.product)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/admin']);
        },
        err => console.error(err)
      );
  }

  updateProduct(){
    delete this.product.createdAt;
    delete this.product.updateAt;

    if(this.product.id != undefined){
      this.productSvc.updateProduct(this.product.id, this.product)
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
