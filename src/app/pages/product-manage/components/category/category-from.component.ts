import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { EmitterService } from '../../emitter.service';
import { Category } from './model/category';
import { CategoryService } from './category.service';
import { CategoryCardComponent } from './category-card.component'


@Component({

  selector: 'toyou-category-form',
  templateUrl: 'category-form.html',
  styles: [`
       .no-style .ng-valid {
          border-left: 1px  solid #CCC
        }

      .no-style .ng-invalid {
          border-left: 1px  solid #CCC
        }
      `]
})
export class CategoryFormComponent {

  constructor(
    private categoryService: CategoryService,
    // private model : Category
  ) {}

  private editing = false;
  private model = new Category('', '', '', '', 'deals', 0, 'REGULAR')

  @Input() editId: string;
  @Input() listId: string;

  @Input() language: Object;

  OnInit() {
    this.model = new Category('', '', '', '', 'deals', 0, 'REGULAR')
  }

  public uploaderOptions: any = {
    url: '/catalog/mgmt/v1/upload-image?folder=CATEGORIES',
    customHeaders: [{
      'Authorization': 'Basic ' + btoa('admin:0000')
    }, {
      'Accept': 'application/json'
    }],
    // multipart: false
    fieldName: 'imageFile'
  };

  onUpload(data) {
    let imageUrl = JSON.parse(data.response).imageUrl;
    if (imageUrl) {
      this.model.imageUrl = imageUrl;
    }

  }

  submitCategory(form) {
    // Var to hold a reference of addCategory/updateCategory
    let categoryOperation: Observable < Category[] > ;
    if (!this.editing) {
      // Create a new Category
      categoryOperation = this.categoryService.addCategory(this.model, this.language)
    } else {
      // Update an existing Category
      categoryOperation = this.categoryService.updateCategory(this.model, this.language)
    }

    categoryOperation
      .subscribe(
        categorys => {
          // Emit list event
          EmitterService.get(this.listId).emit(categorys);
          // Empty model
          this.model = new Category('', '', '', '', 'deals', 0, 'REGULAR')
            // Switch editing status
          if (this.editing) this.editing = !this.editing;
        },
        err => {
          // Log errors if any
          console.log(err);
        });

        this.uploaderOptions.formUploaded = true;
  }

  ngOnChanges(changes: any) {
    // Listen to the 'edit' emitted
    if (changes.language.currentValue) {
      this.language = changes.language.currentValue.new
    }

    EmitterService.get(this.editId).subscribe((category: Category) => {
      this.model = category
      this.editing = true;
    });
  }

  cleanForm() {
    this.model = new Category('', '', '', '', 'deals', 0, 'REGULAR')
    this.editing = false;
  }

  /////////////////////////////
}
