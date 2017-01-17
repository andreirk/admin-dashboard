import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { ProductService } from '../../../../core/services/products/products-service'
import { Currency } from '../../../../shared/types';


@Component({
  selector: 'am-product',
  template: ` 
  <div class="row center-xs products">
      <div class="col-xs-12 creator">
      product creator here
      </div>
      <div class="products col-xs-12">
        <div class="row between-xs">
          <am-product-card
            class="col-xs-12"
            *ngFor="let product of products; "
            [product]="product"
          >
          </am-product-card>
          
        </div>
      </div>
</div>`,
 styles: [`
    .products {
      padding-top: 20px;
    }
  `],
})
export class ProductListComponent {
  products = []
  constructor(private productService: ProductService) {
    this.productService.getPage(0, 20, 'en', Currency.SAR, {})
      .subscribe(resp => {
        this.products = resp.content
        console.log(this.products)
    })
  }

}
