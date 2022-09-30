import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng-lts/api';
import { ProductApi } from '../entities/product-api';
import { ProductsService } from '../services/products.service';
import { Cart } from '../../common/models/cart';
import { CartService } from '../../core/services/cart.service';

@Component({
    selector: 'app-show-products',
    templateUrl: './show-products.component.html',
    styleUrls: ['./show-products.component.scss']
})
export class ShowProductsComponent implements OnInit {

    productsList: ProductApi[] = [];

    sortOptions: SelectItem[];
    sortKey: string;
    sortField: string;
    sortOrder: number;

    constructor(
        private _productsService: ProductsService,
        private _cartService: CartService
    ) { }

    ngOnInit() {
        this._productsService.getProducts().then(res => {this.productsList = res; console.log(res)});

        this.sortOptions = [
            {label: 'Newest First', value: '!year'},
            {label: 'Oldest First', value: 'year'},
            {label: 'Brand', value: 'brand'}
        ];
    }

    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    addToCart(product: any){
        let products: any[] = [];
        
        if(!localStorage.getItem('cart')){
            products.push(product);

            let cart: Cart = {
                id: '',
                currency: 'USD',
                products: products,
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            this._cartService.updateCart(cart);
        }else{
            let cart: Cart = JSON.parse(localStorage.getItem('cart'));
            products = cart.products;
            products.push(product);

            // localStorage.setItem('cart', JSON.stringify(cart));
            this._cartService.updateCart(cart);
        }

       
    }

}
