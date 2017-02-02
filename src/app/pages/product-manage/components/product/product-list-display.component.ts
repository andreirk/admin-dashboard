/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';


@Component({
  selector: 'am-product',
  template: ` 

<div *ngFor="let product of products; ">{{product.id}}</div>
        <!--<am-product-card-->
          <!--class="col-xs-12"-->
          <!--*ngFor="let product of products; "-->
          <!--[product]="product"-->
        <!--&gt;-->
        <!--</am-product-card>-->
          

`,
  styles: [``],
})
export class ProductListDisplayComponent {

  @Input() products;


}
