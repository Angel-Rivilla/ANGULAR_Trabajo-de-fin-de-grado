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
  


  constructor(private cartSvc: CartService,
              private router: Router) { }

  ngOnInit(): void {
    
  }

  clearCart(){
    this.cartSvc.clearCart();
    this.products = [];
    this.cartSvc.priceTotal = 0;
  }

  deleteItem(product: ProductI): void {
    this.cartSvc.deleteItem(product);
    if(product.price) {
      this.cartSvc.restPriceT(product.price);
    }
  }
}
