import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './shared/components/layout/layout.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MainComponent } from './main/main.component';


const routes: Routes = [
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
                path: 'products',
                component: LayoutComponent,
                loadChildren: './products/products.module#ProductsModule'
            },
            // {
            //     path: 'examples',
            //     component: LayoutComponent,
            //     loadChildren: './examples/examples.module#ExamplesModule',
            //     data: {
            //         title: 'examples.$TITLE'
            //     }
            // },
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
