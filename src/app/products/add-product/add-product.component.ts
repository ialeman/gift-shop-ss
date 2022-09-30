import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [MessageService]
})
export class AddProductComponent implements OnInit {

  public form: FormGroup
  public submitted = false;
  private msgs: Message[] = [];
  public rating: number = 0;
  public categoriesList = [];


  constructor(
    fb: FormBuilder,
    private _productService: ProductsService,
    private _categoryService: CategoriesService
  ) {
    this.form = fb.group({
      title: ['', Validators.required],
      price: [null, Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      rating: [0, Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    this._categoryService.getCategories().then(res=> {this.categoriesList = res; console.log(res)});
  }

  submitForm() {
    this.submitted = true;
    console.log("submit");
    console.log(this.form.value);

    if (this.form.invalid) {
      return;
    }

    let model = this.form.value;
    this.msgs = [];

    this._productService.add(model).subscribe(
      res => {
        this.submitted = false;
        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Product created!' });
        this.form.reset();
        setTimeout(() => {
          this.msgs = [];
        }, 3000);
      },
      err => {
        this.msgs.push({severity:'error', summary:'Error', detail:'Creation failed'});
      }
    )

  }

}
