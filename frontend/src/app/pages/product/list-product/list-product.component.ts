import { Component, HostBinding, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  products: any = [];

  constructor(private productSvc: ProductService) { }
  
  ngOnInit(): void {
    this.getProducts();
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
