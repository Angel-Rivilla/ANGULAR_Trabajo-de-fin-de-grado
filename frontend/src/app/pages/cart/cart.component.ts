import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductI } from 'src/app/interface/product';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products = this.cartSvc.getItems();
  priceTotal = this.cartSvc.priceTotal;
  countCart = this.cartSvc.countCart;
  productos$: ProductI[] | null = [];


  productI: ProductI = {
    id: 0,
    title: '',
    description: '',
    price: '',
    count: 1,
    image: '',
    createdUser: '',
    createdAt: new Date(),
    updateAt: new Date()
  };
  
  constructor(private cartSvc: CartService) { }

  ngOnInit(): void {
    console.log(this.products); 
    this.cartSvc.products$.subscribe((res) => (this.productos$ = res));
    console.log(this.productos$);
  }

  clearCart(){
    this.cartSvc.clearCart();
    this.products = [];
    this.cartSvc.priceTotal = 0;
    this.cartSvc.countCart = 0;
  }

  deleteItem(product: ProductI): void {
    this.cartSvc.deleteItem(product);
    if(product.price) {
      this.cartSvc.restPriceT(product.price);
      this.priceTotal = this.priceTotal - parseInt(product.price, 10);
      this.countCart = this.countCart - 1;
    }
  }
}
