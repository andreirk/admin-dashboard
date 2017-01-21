/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductActions } from "./actions/product.actions";
import { MerchantProductAppState } from "./reducers/index";
import { Product } from "../../../../commons/model/product";
import { Currency } from "../../../../shared/types";


@Component({
    selector: 'am-product-details-container',
    template: `
<am-product-form
            [product]="product | async"
            (back)="goBack()"
            (save)="save($event)"
></am-product-form>
`
})
export class ProductDetailsContainerComponent implements OnInit {
  idSub: Subscription;
  product: Observable<any>;
  navigated = false;
  merchantId;

  private lang: string = 'en';
  private currency: Currency =  Currency.USD;

  @Output() close = new EventEmitter();

  constructor(
    private store: Store<MerchantProductAppState>,
    private route: ActivatedRoute,
    private productActions: ProductActions,
    private router: Router
  ) {
    this.product = store.select('product');
  }

  ngOnInit() {
    console.log('product detail on init')

    this.route.parent.params.subscribe(params => {
      if (params['merchantId']) {
        this.merchantId = params['merchantId'];
        if (this.merchantId !== 'new') {
        //  this.changeLang(false, this.lang);
        }
      }
    });

    this.idSub = this.route.params
      .select<string>('productId')
      .subscribe(id => {
        console.log('get id in details container', id);
        if (id && id !== 'new') {
            let payload = {
              id,
              lang: this.lang,
              currency: this.currency

            };
            this.store.dispatch(this.productActions.getProduct(payload));
            this.navigated = true;
        } else if(id === 'new') {
            this.store.dispatch(this.productActions.resetBlankProduct());
            this.navigated = false;
        }
      });
  }

  ngOnDestroy() {
    this.idSub.unsubscribe();
  }

  goBack(savedProduct: Product = null) {
    this.close.emit(savedProduct);
    if (this.navigated) { window.history.back(); }
  }

  save(product) {
    console.log('in product deteails save', {product})
    const payload = {
      product,
      productOriginal: product,
      merchantId : this.merchantId,
      lang: this.lang
    };

    this.store.dispatch(this.productActions.saveProduct(payload));
/*
    this.goBack(product);
    */
  }

}
