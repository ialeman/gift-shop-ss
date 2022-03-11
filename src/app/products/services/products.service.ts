import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/core/api-url.token';
import { ProductApi } from '../entities/product-api';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private readonly _url: string;

    constructor(
        private http: HttpClient,
        @Inject(API_URL) apiUrl: string
    ) { this._url = `${apiUrl}/api/products`; }

    getProducts() {
        return this.http.get("../assets/products.json").toPromise()
            .then((res: any) => <ProductApi[]> res)
            .then(data => {
                return data;
            });
    }
}
