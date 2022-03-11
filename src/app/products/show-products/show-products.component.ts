import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng-lts/api';
import { ProductApi } from '../entities/product-api';
import { ProductsService } from '../services/products.service';

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
        private _productsService: ProductsService
    ) { }

    ngOnInit() {
        this._productsService.getProducts().then(res => this.productsList = res);

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

}
