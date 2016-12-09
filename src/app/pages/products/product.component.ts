import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { ProductService } from '../../services'


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


@Component({
  selector: 'am-product-card',
  // styles: [require('./product.style.css')],
  template: `
            <div class="col-sm-10" (click)="onProductClick($event)">
              <div class="card card-block">
                <h5 class="card-title">Product id {{product.id}}</h5>
                <p class="card-text">Short description.</p>
                <a href="#" class="btn btn-primary">Edit</a>
              </div>
            </div>     
  `
})
export class ProductCard {
  @Input() product = {};
  @Output() checked = new EventEmitter()
  showCheck: boolean = false;

  toggleCheck() {
    this.showCheck = !this.showCheck;
  }

  onChecked() {
    this.checked.next(this.product); 
  }

  onProductClick(event){
    this.product++;
  }
}