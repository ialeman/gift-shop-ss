import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProductsRoutingModule } from './products-routing.module';
import { ShowProductsComponent } from './show-products/show-products.component';

import { DataViewModule } from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';
import {RatingModule} from 'primeng/rating';
import {ButtonModule} from 'primeng/button';

@NgModule({
    declarations: [
        ShowProductsComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,

        ProductsRoutingModule,
        DataViewModule,
        DropdownModule,
        InputTextModule,
        RatingModule,
        ButtonModule
    ]
})
export class ProductsModule { }
