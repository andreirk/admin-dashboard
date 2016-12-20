import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { ProductService } from '../../products-service'


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
    this.productService.getProducts()
      .subscribe(resp => {
        this.products = resp.content
        console.log(this.products)
    })
  }

}
