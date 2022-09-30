import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../core/services/categories.service';
import { Message } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.scss']
})
export class CategoriesAddComponent implements OnInit {

  public submitted = false;
  public form: FormGroup
  public msgs: Message[] = [];
  public editMode = false;

  constructor(
    fb: FormBuilder,
    private _categoryService: CategoriesService,
    private router: Router
  ) {
    this.form = fb.group({
      id: [''],
      name: ['', Validators.required],
      icon: ['', Validators.required]
    });

  }

  ngOnInit() {
    let splitUrl = this.router.url.split("/");
    let mode = splitUrl[splitUrl.length - 1];
    if (mode == 'edit') {
      this.editMode = true;
      let model = JSON.parse(localStorage.getItem("category"));
      this.form.get('name').patchValue(model.name);
      this.form.get('icon').patchValue(model.icon);
      this.form.get('id').patchValue(model.id);
      console.log(this.form);
    }
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return false;
    }

    let model = this.form.value;

    if (!this.editMode) {
      this._categoryService.add(model).subscribe(
        res => {
          this.submitted = false;
          this.form.reset();
          this.msgs = [];
          this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Category created!' });
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        },
        err => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Creation failed!' });
        }
      );
    } else {
      localStorage.removeItem('category');
      this._categoryService.edit(model).subscribe(
        res => {
          // this.submitted = false;
          // this.form.reset();
          // this.msgs = [];
          // this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Category created!' });
          // setTimeout(() => {
          //   this.msgs = [];
          // }, 3000);
          this.router.navigate(['/categories']);
        },
        err => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Edit failed!' });
          setTimeout(() => {
            this.msgs = [];
          }, 3000);
        }
      );
    }
  }

}
