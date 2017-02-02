/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductActions } from './actions/product.actions';
import { MerchantProductAppState } from '../../store/index';
import { Currency } from '../../../../shared/types';


@Component({
    selector: 'am-product-details-container',
    template: `
<am-product-form
            [product]="product$ | async"
            (back)="goBack()"
            (save)="save($event)"
></am-product-form>
`
})
export class ProductDetailsContainerComponent implements OnInit {

  product$: Observable<any>;
  merchantId;

  private lang: string = 'en';
  private currency: Currency = Currency.SAR;

  @Output() close = new EventEmitter();

  constructor(
    private store: Store<MerchantProductAppState>,
    private route: ActivatedRoute,
    private productActions: ProductActions,
    private router: Router
  ) {
    this.product$ = store.select('product');
  }

  ngOnInit() {

    let merchantId = this.route.parent.snapshot.params['merchantId'];


    if (merchantId) {
      this.merchantId = merchantId
    }

    let productId = this.route.snapshot.params['productId'];

    if (productId && productId !== 'new') {
      let payload = {
        productId,
        lang: this.lang,
        currency: this.currency

      };
      this.store.dispatch(this.productActions.getProduct(payload));

    } else if(productId === 'new') {
      this.store.dispatch(this.productActions.resetBlankProduct());

    }

     this.product$
       .subscribe(
         product => {
           if (product.id){
             this.router.navigate(['../', product.id],{ relativeTo: this.route });

           }
         }
       )

  }


  save(product) {
    const payload = {
      product,
      merchantId : this.merchantId,
      lang: this.lang
    };
    this.store.dispatch(this.productActions.saveProduct(payload));

  }

}
