import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductI } from '../interface/product';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: ProductI[] = [];
  products: Observable<ProductI[]> | undefined;

  constructor(private authSvc: AuthService,
              private productSvc: ProductService) {
    this.authSvc.isLogged.subscribe(res => {
      console.log(res);
      if(res){
        this.getProducts();
        console.log(this.items);
        console.log(this.products);
      } 
    });
  }

  addProduct(product: ProductI){
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
  
  deleteItem(product: ProductI){
    const eliminar = this.items.findIndex(p => p.id === product.id); 
    this.items.splice(eliminar, 1);
  }

  getProducts(){
    this.products = this.productSvc.getProducts();
  }
}
