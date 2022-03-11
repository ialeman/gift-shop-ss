import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductApi } from '../../products/entities/product-api';

const header = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  constructor(private http: HttpClient) { }


  getProducts() {
    return this.http.get('https://fakestoreapi.com/products')
      .toPromise()
      .then(res => <ProductApi[]> (res as any))
      .then(data => {
        return data;
      });

  }

}
