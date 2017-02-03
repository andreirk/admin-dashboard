/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../../../../shared/components/modal.component';
import { ProductActions } from './actions/product.actions';
import { MerchantProductAppState } from '../../store/index';
import { Currency } from '../../../../shared/types';


@Component({
  selector: 'am-product-list-container',
  template: `
   
    <am-product-list [products]="products$ | async">
  
    </am-product-list>
  
`

})
export class ProductListContainerComponent implements OnInit {

  products$: Observable<any>;
  private lang: string = 'en';
  private currency: Currency = Currency.SAR;
  private merchantId: string;

  constructor(private route: ActivatedRoute,
              private store: Store<MerchantProductAppState>,
              private productActions: ProductActions
  ) {
     this.products$ = store.select('products');
  }


  ngOnInit() {

    this.route.parent.params.subscribe(params => {

      if (params['merchantId']) {
        console.log('merchant id', params['merchantId'])
        this.merchantId = params['merchantId'];
        let payload = {
          options: {
            'merchant-id': params['merchantId'],
            'currency': this.currency,
            'available': true,
            'page': 0,
            'size': 1000,
            'sort': 'name',
          },
          'lang': this.lang
        };

        this.store.dispatch(this.productActions.loadProducts(payload));

      }
    });

  }

}
