import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowProductsComponent } from './show-products/show-products.component';
import { AddProductComponent } from './add-product/add-product.component';


const routes: Routes = [
    
    {
        path: '', 
        component: ShowProductsComponent,
    },
    {
        path: 'add-product',
        component: AddProductComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
