import { Component, OnInit } from '@angular/core';
import { Icons } from 'src/app/common/models/icons.enum';
import { Categories } from '../../common/models/Categories';
import { CategoriesService } from '../../core/services/categories.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categoriesList: Categories[];
  icons = Icons;
  
  constructor(
    private _categoriesService: CategoriesService,
  ) { }

  ngOnInit() {
    this._categoriesService.getCategories().then(res => this.categoriesList = res);
  }

  getIconByName(categoryName: string) {
    categoryName = categoryName.trim();
    categoryName = categoryName.replace(/[^a-zA-Z]+/g, '');
    return this.icons[categoryName];
  }

}
