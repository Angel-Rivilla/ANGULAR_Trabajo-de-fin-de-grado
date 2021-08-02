import { Injectable } from '@angular/core';
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
              private productSvc: ProductService) {
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
    //}
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.countCart = 0;
    return this.items;
  }
  
  deleteItem(product: ProductI){
    const eliminar = this.items.findIndex(p => p.id === product.id); 
    this.items.splice(eliminar, 1);
    this.countCart = this.countCart - 1;
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
}
