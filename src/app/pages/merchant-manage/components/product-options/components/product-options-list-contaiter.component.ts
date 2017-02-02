/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit } from '@angular/core';
import { MerchantBackendService } from '../../../../../core/services/merchants/merchant-backend.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MerchantProductAppState } from '../../../store/index';
import { Observable } from 'rxjs';
import { ProductOption } from '../../../../../commons/model/product-option';
import { ProductOptionActions } from '../actions/product-option.actions';

@Component({
    selector: 'am-product-options-container',
    template: `     

       <am-product-option-list-display [productOptions]="productOptionList$ | async"></am-product-option-list-display>
`
})
export class ProductOptionListContainerComponent implements OnInit {

    productOptionList$: Observable<any> ;
    merchantId;
    lang = 'en';

    constructor(private route: ActivatedRoute,
                private productOptionActions: ProductOptionActions,
                private store: Store<MerchantProductAppState>,) {

      this.productOptionList$ = store.select('productOptions');
    }

    ngOnInit() {

      this.route.parent.params.subscribe(params => {

        if (params['merchantId']) {
          console.log('merchant id', params['merchantId'])
          this.merchantId = params['merchantId'];
          let payload = {
            merchantId : this.merchantId,
            lang: this.lang,
          }

          this.store.dispatch(this.productOptionActions.getProductOptionList(payload));

        }
      });

    }

}
