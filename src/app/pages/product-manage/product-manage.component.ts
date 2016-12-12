import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { ProductService } from './products-service'


@Component({
  selector: 'am-product-manage',
  styles: [],
  template: ` Product manage here
            <router-outlet></router-outlet>`
})
export class ProductManageComponent {

  constructor() {

  }
  
  ngOnInit() {
  }

}
