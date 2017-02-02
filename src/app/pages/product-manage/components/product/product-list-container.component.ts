import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { ProductService } from '../../../../core/services/products/products-service'
import { Currency } from '../../../../shared/types';
import { ActivatedRoute } from '@angular/router';

import { MerchantProductAppState } from '../../reducers/index';
import { Observable } from 'rxjs';


@Component({
  selector: 'am-product-list-container',
  template: ` 
  <div class="row center-xs products">

      <div class="products col-xs-12">
        <div class="row between-xs">
        
         <am-product-list [products]="products$ | async">
      
         </am-product-list>
                
        </div>
      </div>
  </div>`,
 styles: [`
    .products {
      padding-top: 20px;
    }
  `],
})
export class ProductListContainerComponent {

  products$: Observable<any> ;
  merchantId: string = 'da67c08a-88b7-4d8e-a6b9-33e13345510d';
  currency: Currency = Currency.SAR;
  lang: string = 'en';

  constructor(private route: ActivatedRoute,
 ) {


  }

  ngOnInit() {

    this.route.parent.params.subscribe(params => {
      console.log(params)
    });

    let payload = {
      options: {
        'merchantId': this.merchantId,
        'currency': this.currency,
        'available': true,
        'page': 0,
        'size': 20,
        'sort': 'name',
      },
      'lang': this.lang
    };



  }

}
