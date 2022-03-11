import { Component, OnInit } from '@angular/core';

import { NavItem } from '../common/models/nav-item.model';
import { AuthService } from '../core/services/auth.service';
import { CategoriesService } from '../core/services/categories.service';
import { Categories } from '../common/models/Categories';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    // navItems: NavItem[] = [
    //     { name: 'examples.$TITLE', route: '' }
    // ];

    categoriesList: Categories[];

    constructor(
        private _authService: AuthService,
        private _categoriesService: CategoriesService
    ) { }

    ngOnInit(): void {
        this._categoriesService.getCategories().then(res => this.categoriesList = res);
    }

    logOut() {
        this._authService.logOut();

    }
}
