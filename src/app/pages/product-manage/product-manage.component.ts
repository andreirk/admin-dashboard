import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { ProductService } from '../../core/services/products/products-service'


@Component({
  selector: 'am-product-manage',
  styles: [],
  template: ` 
            <router-outlet></router-outlet>`
})
export class ProductManageComponent {

  constructor() {

  }

  ngOnInit() {
  }

}
