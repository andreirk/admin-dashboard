import {
  Component,
  Input
} from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { EmitterService } from '../../emitter.service';
import { Category } from '../../../../commons/model/category';
import { CategoryService } from '../../../../core/services/categories/category.service';

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
  ) {}

  private editing = false;
  private model = new Category();

  @Input() editId: string;
  @Input() listId: string;

  @Input() language: Object;

  OnInit() {
    this.model = new Category();
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
          this.model = new Category();
            // Switch editing status
          if (this.editing) this.editing = !this.editing;
        },
        err => {
          // Log errors if any
          console.log(err);
        });
  }

  ngOnChanges(changes: any) {
    // Listen to the 'edit' emitted
    if (changes.language.currentValue) {
      this.language = changes.language.currentValue.new
    }

    EmitterService.get(this.editId).subscribe((category: Category) => {
      this.model = category;
      this.editing = true;
    });
  }

  cleanForm() {
    this.model = new Category();
    this.editing = false;
  }

  /////////////////////////////
}
