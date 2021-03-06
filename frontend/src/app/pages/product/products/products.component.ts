import { Component, HostBinding, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { ScriptService } from 'src/app/services/script.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  user$: string | null | undefined;
  tokenReset$: string | null | undefined;
  isLogged = false
  fila: any;

  products: any = [];

  constructor(private productSvc: ProductService,
              public authSvc: AuthService,
              private scriptSvc: ScriptService) { 
              }
  
  ngOnInit(): void {
    this.getProducts();
    this.authSvc.usernameLogged.subscribe((res) => (this.user$ = res))
    this.authSvc.isLogged.subscribe((res) => (this.isLogged = res))
    this.authSvc.isToken$.subscribe((res) => (this.tokenReset$ = res))
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
