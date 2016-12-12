import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CategoryService } from './category.service'


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


  `],
})
export class CategoryListComponent {
  categories = []

  constructor(private categorieService: CategoryService) {
    this.categorieService.getCategories()
      .subscribe(resp => {
        this.categories = resp.content
        console.log(this.categories)  
    })
  }
}