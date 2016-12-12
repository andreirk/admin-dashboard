import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CategorytService } from '../../../../services'


@Component({
  selector: 'am-category-list',
  template: ` 
  <div class="row center-xs categories">
      <div class="col-xs-12 creator">
      category creator here
      </div>
      <div class="categories col-xs-12">
        <div class="row between-xs">
          <li
            class="col-xs-12"
            *ngFor="let category of [1,2,3,4,5,6]; let i = index; "
          >
          Category {{i}}
          </li>
          
        </div>
      </div>
</div>`,
 styles: [`
    .categories {
      padding-top: 20px;
    }
  `],
})
export class CategoryListComponent {
  products = []

//   constructor(private productService: CategoryService) {
//     this.productService.getProducts()
//       .subscribe(resp => {
//         this.products = resp.content
//         console.log(this.products)  
//     })
//   }


}