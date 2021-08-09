import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductI } from 'src/app/interface/product';
import { CartService } from 'src/app/services/cart.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products = this.cartSvc.getItems();
  priceTotal = this.cartSvc.getPriceTProduct();
  countCart = this.cartSvc.getCountTotal();
  productos$: ProductI[] = [];

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
  
  constructor(private cartSvc: CartService,
              private modal: NgbModal) { }

  ngOnInit(): void {
    this.productos$ = this.cartSvc.getStoreProduct();
    console.log(this.products); 
    console.log(this.productos$);
  }

  clearCart(){
    this.cartSvc.clearCart();
    this.products = [];
    this.cartSvc.priceTotal = 0;
    this.cartSvc.countCart = 0;
    this.cartSvc.redirectTo('/cart');
  }

  deleteItem(product: ProductI): void {
    if(product.price) {
      this.cartSvc.restPriceT(product.price);
      this.priceTotal = this.priceTotal - parseInt(product.price, 10);
      this.countCart = this.countCart - 1;
    }
    this.cartSvc.deleteItem(product);
    this.cartSvc.redirectTo('/cart');
  }

  mDeleteProduct(contenido: any){
    this.modal.open(contenido, {centered: true});
  }
}
