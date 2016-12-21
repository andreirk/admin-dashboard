import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { EmitterService } from '../../emitter.service'
import { Category } from './model/category';
import { CategoryService } from './category.service';

@Component({
  selector: 'toyou-category-card',
  template: require('./category-card.html'),
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
    .cat-name {
      width:100px;
      overflow: hidden;
      padding:5px;
    }

    .cat-description {
      white-space: normal;
      width:100px;
      overflow: hidden;
    }

    .cat-buttons {
      padding: 5px;
      margin: 5px;
    }

  `]

})
export class CategoryCardComponent {
  // Constructor
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
    console.log('edit category', this.editId)
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

  onCategoryClick(event){
    alert(this.category);
  }
}