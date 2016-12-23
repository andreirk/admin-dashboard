import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { EmitterService } from '../../emitter.service'
import { Category } from '../../../../commons/model/category';
import { CategoryService } from '../../../../core/services/categories/category.service';

@Component({
  selector: 'toyou-category-card',
  template: `
  <div class="col-sm-10">
  <div class="card card-block">
    <img class="card-img-top col-xs-4 col-sm-3" src="{{category.imageUrl}}" alt="{{category.imageUrl}}">
    <h5 class="card-title">{{category.name}}</h5>
    <p class="card-text">{{category.description}}</p>
    <div class="pull-right">
      <button type="button" class="btn btn-xs btn-default" (click)="editCategory()" >
          <span class="glyphicon glyphicon-pencil"><i class="fa fa-pencil" aria-hidden="true"></i> </span>
      </button>
      <button type="button" (click)="deleteCategory(category.id)" class="remove-news btn btn-xs btn-default" data-toggle="tooltip" data-placement="top" data-original-title="Delete">
          <span class="glyphicon glyphicon-trash"><i class="fa fa-trash" aria-hidden="true"></i> </span>
      </button>     
    </div>

  </div>
</div>
  ` ,
  styles: [`
    .category-card {
      margin: 0px;
    }
    .card-block {
      margin: 3px;
    }
    .active {
      color: black
    }
  `]

})
export class CategoryCardComponent {

  constructor(
    private categoryService: CategoryService
    ){}

  @Input() category: Category;
  @Input() listId: string;
  @Input() editId:string;

  isEditing = false;

  @Output() checked = new EventEmitter()

  showCheck: boolean = false;

  editCategory() {
    // Emit edit event
    EmitterService.get(this.editId).emit(this.category);
    this.isEditing = true;
    jQuery('html, body').animate({scrollTop:0}, {duration:400});
  }

  deleteCategory(id:string) {
    // Call removeCategory() from CategoryService to delete category
     let areYouSure = confirm(`Do you really want to delete category ${this.category.name}`);
     if(areYouSure){
        this.categoryService.removeCategory(id)
                    .subscribe(
                        categorys => {
                            // Emit list event
                            EmitterService.get(this.listId).emit(categorys);
                        },
                        err => {
                            // Log errors if any
                            console.log(err);
                        });
        }
  }

  toggleCheck() {
    this.showCheck = !this.showCheck;
  }

  onChecked() {
    this.checked.next(this.category);
  }

}
