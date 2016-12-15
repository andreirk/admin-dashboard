import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { EmitterService } from '../../emitter.service'
import { Category } from './category';
import { CategoryService } from './category.service';

@Component({
  selector: 'toyou-category-card',
  // styles: [require('./product.style.css')],
  template: require('./category-card.html')
  
  
  // `
  //           <div class="col-sm-10" (click)="onCategoryClick($event)">
  //             <div class="card card-block">
  //               <h5 class="card-title">Category id {{category.id}}</h5>
  //               <p class="card-text">Short description.</p>
  //               <a href="#" class="btn btn-primary">Edit</a>
  //             </div>
  //           </div>     
  // `

})
export class CategoryCardComponent {
  // Constructor
  constructor(
    private categoryService: CategoryService
    ){}

  @Input() category: Category;
  @Input() listId: string;
  @Input() editId:string;

  @Output() checked = new EventEmitter()
  showCheck: boolean = false;

  editCategory() {
    // Emit edit event
    EmitterService.get(this.editId).emit(this.category);
    console.log('edit category', this.editId)
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