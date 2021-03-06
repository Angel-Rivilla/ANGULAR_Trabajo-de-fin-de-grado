import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductI } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductI[]> {
    return this.http
    .get<ProductI[]>(`${environment.API_URL}/products`);
  }

  getProduct(id: string){
    return this.http.get(`${environment.API_URL}/products/${id}`);
  }

  deleteProduct(id: string){
    return this.http.delete(`${environment.API_URL}/products/${id}`);
  }

  saveProduct(product: ProductI){
    return this.http.post(`${environment.API_URL}/products`, product);
  }

  updateProduct(id: number, updateProduct: ProductI) {
    return this.http.patch(`${environment.API_URL}/products/${id}`, updateProduct);
  }
}
