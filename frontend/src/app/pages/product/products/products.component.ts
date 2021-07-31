import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  user$: string | null | undefined;
  isLogged = false

  products: any = [];

  constructor(private productSvc: ProductService,
              public authSvc: AuthService) { }
  
  ngOnInit(): void {
    this.getProducts();
    this.authSvc.usernameLogged.subscribe((res) => (this.user$ = res))
    this.authSvc.isLogged.subscribe((res) => (this.isLogged = res))
  }

  getProducts(){
    this.productSvc.getProducts().subscribe(
      res => {
        this.products = res;
      },
      err=> console.error(err)
    );
  }
}
