import { Component, OnInit } from '@angular/core';

import { NavItem } from '../common/models/nav-item.model';
import { AuthService } from '../core/services/auth.service';
import { CategoriesService } from '../core/services/categories.service';
import { Categories } from '../common/models/Categories';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    // navItems: NavItem[] = [
    //     { name: 'examples.$TITLE', route: '' }
    // ];
    items: MenuItem[];
    categoriesList: Categories[];

    constructor(
        private _authService: AuthService,
        private _categoriesService: CategoriesService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._categoriesService.getCategories().then(res => this.categoriesList = res);
        this.items = [
            { icon: 'pi pi-home' },
            { label: 'Products' }
        ];
        
        this._router.navigate(['/products']);
    }

    logOut() {
        this._authService.logOut();

    }
}
