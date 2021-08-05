import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductI } from '../interface/product';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: ProductI[] = [];
  products: Observable<ProductI[]> | undefined;
  priceTotal = 0;
  countCart = 0;

  constructor(private authSvc: AuthService,
              private productSvc: ProductService,
              private router: Router) {
    this.authSvc.isLogged.subscribe(res => {
      console.log(res);
      if(res){
        this.getProducts();
      } 
    });
  }

  addProduct(product: ProductI){
    const pos = this.items.findIndex(p => p.id === product.id) 
    //if(pos == -1){
      this.items.push(product);
      this.saveProduct(this.items, this.priceTotal, this.countCart);
    //}
  }

  getItems() {
    return this.items;
  }

  getStoreProduct(){
    return JSON.parse(localStorage.getItem('producto') || '{}');
  }

  getPriceTProduct(){
    return JSON.parse(localStorage.getItem('priceTotal') || '{}');
  }

  getCountTotal(){
    return JSON.parse(localStorage.getItem('countCart') || '{}');
  }

  clearCart() {
    this.items = [];
    this.countCart = 0;
    this.priceTotal = 0;
    this.saveProduct(this.items, this.priceTotal, this.countCart);
    return this.items;
  }
  
  deleteItem(product: ProductI){
    const eliminar = this.items.findIndex(p => p.id === product.id); 
    this.items.splice(eliminar, 1);
    this.countCart = this.countCart - 1;
    this.saveProduct(this.items, this.priceTotal, this.countCart);
  }

  getProducts(){
    this.products = this.productSvc.getProducts();
  }

  sumPriceT(price: string) {
    return this.priceTotal = this.priceTotal + parseInt(price,10)
  }

  restPriceT(price: string){
    return this.priceTotal = this.priceTotal - parseInt(price, 10);
  }

  public saveProduct(producto: ProductI[],priceTotal: number, countCart: number): void{
    localStorage.setItem('producto', JSON.stringify(producto));
    localStorage.setItem('priceTotal', JSON.stringify(priceTotal));
    localStorage.setItem('countCart', JSON.stringify(countCart));
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
}
