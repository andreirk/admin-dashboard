/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MerchantProductAppState } from '../../../store/index';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductActions } from '../../products/actions/product.actions';
import { MerchantBackendService } from '../../../../../core/services/merchants/merchant-backend.service';
import { ProductOptionActions } from '../actions/product-option.actions';
import { Observable } from 'rxjs';
import { Currency } from '../../../../../shared/types';

@Component({

    selector: 'am-product-option-details',
    template: `

      <am-product-option-form 
        [productOption]="productOption$ | async"  
        (saveForm)="onSaveProductOption($event)"
        >
      
      </am-product-option-form>
   
`
})
export class ProductOptionDetailsContainerComponent implements OnInit {

    merchantId;
    productOption$: Observable<any>;
    productOptionValues;
    lang = 'en';
    currency: Currency = Currency.SAR;

    constructor(
      private store: Store<MerchantProductAppState>,
      private route: ActivatedRoute,
      private productOptionActions: ProductOptionActions,
      private router: Router,
      private merchantService: MerchantBackendService,
    ) {
      this.productOption$ = store.select('productOption');
    }

    ngOnInit() {

      let merchantId = this.route.parent.snapshot.params['merchantId'];

      if (merchantId) {

          this.merchantId = merchantId;

          let productOptionId = this.route.snapshot.params['productOptionId'];

          if (productOptionId && productOptionId !== 'new') {
            let payload = {
              merchantId,
              productOptionId,
              lang: this.lang,
              currency: this.currency,
            };

            this.store.dispatch(this.productOptionActions.getProductOption(payload));

          } else if(productOptionId === 'new') {
             this.store.dispatch(this.productOptionActions.resetBlankProductOption());

          }

      }

      this.productOption$
        .subscribe(
          result => {
            console.log('in product details subscribe', result)
            this.productOptionValues = result.values;
          }
        )

    }

    onSaveProductOption({productOption, productValuesToDelete}){
      let payload = {
        productOption: productOption,
        productValuesToDelete,
        merchantId: this.merchantId,
      };
      console.log(payload);
      this.store.dispatch(this.productOptionActions.saveProductOption(payload))
    }

}
