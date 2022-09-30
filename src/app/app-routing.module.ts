import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './shared/components/layout/layout.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MainComponent } from './main/main.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesAddComponent } from './categories/categories-add/categories-add.component';
import { CartViewComponent } from './cart-view/cart-view.component';


const routes: Routes = [
    // { path: '**', component: ErrorComponent },
    {
        path: 'auth',
        component: LayoutComponent,
        loadChildren: './auth/auth.module#AuthModule'
    },
    
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'app.HOME'
        },
        children: [
            {
                path: '',
                redirectTo: '/products',
                pathMatch: 'full'
            },
            {
                path: 'products',
                component: LayoutComponent,
                // loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
                loadChildren:  './products/products.module#ProductsModule'
            },
            {
                path: 'categories',
                children: [
                    {
                        path: '',
                        component: CategoriesListComponent
                    },
                    {
                        path: 'add',
                        component: CategoriesAddComponent
                    },
                    {
                        path: 'edit',
                        component: CategoriesAddComponent
                    }
                ]
            },
            {
                path: 'cart',
                component: CartViewComponent
            }
        ]
    },
    {
        path: 'error',
        component: ErrorComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
