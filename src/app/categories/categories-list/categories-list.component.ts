import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  categoriesList: any[] = [];
  categorieSelected: any;

  constructor(
    private _categoriesService: CategoriesService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._categoriesService.getCategories().then(res => this.categoriesList = res);
  }

  sendToEdit(){
    localStorage.setItem('category', JSON.stringify(this.categorieSelected));
    this._router.navigate(['/categories/edit'])
  }

}
