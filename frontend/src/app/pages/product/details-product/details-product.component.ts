import { LowerCasePipe } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductI } from 'src/app/interface/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

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

  products: any = [];
  
  isLogged = false;
  user$: string | null | undefined;

  constructor(private productSvc: ProductService,
              private router: Router, 
              private activedRoute: ActivatedRoute,
              private authSvc: AuthService) {}

  ngOnInit(): void {
    this.authSvc.usernameLogged.subscribe((res) => (this.user$ = res))
    this.authSvc.isLogged.subscribe((res) => (this.isLogged =  res))

    const params = this.activedRoute.snapshot.params;
    if(params.id){
      this.productSvc.getProduct(params.id).
        subscribe(
          res => {
            this.product = res;
          },
          err => console.error(err)
        )
    }
  }

  getProducts(){
    this.productSvc.getProducts().subscribe(
      res => {
        this.products = res;
      },
      err=> console.error(err)
    );
  }

  deleteProduct(id: string){
    this.productSvc.deleteProduct(id).subscribe(
      res => {
        console.log(res);
        alert(id + "borrado")
        this.getProducts();
      },
      err => console.log(err)
    );
  }
}