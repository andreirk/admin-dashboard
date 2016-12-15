import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { CategoryService } from './category.service'
import { EmitterService } from '../../emitter.service';
import { StringListSort } from './../../../../theme/pipes';



@Component({
 
  selector: 'am-category-list',
  template: require('./category-list.1.html')
  
//   ` 
//   <div class="row center-xs categories">
//       <div class="col-xs-12 creator">
//       category creator here
//       </div>
//       <div class="categories col-xs-12">
//         <div class="row between-xs">
//           <am-category-card
//             class="col-xs-12"
//             *ngFor="let category of categories; let i = index; "
//             [category]="category"
//           >
//           </am-category-card>
          
//         </div>
//       </div>
// </div>`
,
 styles: [`
    
    .caterory-card  {
      margin: 1em;
      padding: 2em;
    }
  
  `],
})
export class CategoryListComponent {

  constructor(private categorieService: CategoryService) {

  }  

  categories = []


  @Input() listId: string;
  @Input() editId: string;

  ngOnInit(){
    // Load categories
    this.loadCategories()
  }

  loadCategories(){
      // Get all categories
        this.categorieService.getCategories()
          .subscribe(resp => {
            this.categories = resp.content
            console.log('this are categories', this.categories)  
        })
  }

  ngOnChanges(changes:any) {
    // Listen to the 'list'emitted event so as populate the model
    // with the event payload
    EmitterService.get(this.listId).subscribe((comments:Comment[]) => {this.loadCategories()});
}

}