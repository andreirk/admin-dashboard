/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ProductService } from '../../../../../core/services/products/products-service';
import { ProductActions } from '../actions/product.actions';
import { Store } from '@ngrx/store';
import { MerchantProductAppState } from '../../../store/index';
import { Currency } from '../../../../../shared/types';

@Injectable()
export class ProductEffects {
  constructor (
    private update$: Actions,
    private productActions: ProductActions,
    private productService: ProductService,
    private store: Store<MerchantProductAppState>,
) {}

@Effect() loadProducts$ = this.update$
  .ofType(ProductActions.LOAD_PRODUCTS)
  .map(action => action.payload)
  .debug('Action payload reicved')
  .switchMap((payload) => this.productService.getProducts(payload.options, payload.lang))
  .map(products => this.productActions.loadProductsSuccess(products));


@Effect() getProduct$ = this.update$
  .ofType(ProductActions.GET_PRODUCT)
  .map(action => {
    console.log('in get pruduct effect action', action);
    return action.payload
  })
  .switchMap(payload => {
    console.log('in get pruduct effect payload', payload);
    let options = {
      currency: payload.currency,
      expand: 'tagValues,mediaResources,tags'
    } ;
    return this.productService.getOne(payload.productId, payload.lang, options)
  })
  .map(product => {
    console.log('in get product effect after service call ', product);
    return this.productActions.getProductSuccess(product);
  });


@Effect() saveProduct$ = this.update$
  .ofType(ProductActions.SAVE_PRODUCT)
  .map(action => {
    console.log('save action dispatch effect', action);
    return action.payload }
  )
  .withLatestFrom(this.store, (payload, state) => ({payload, state}))
  .switchMap(({payload, state}) => {

      const originalProduct = state.product;
      const updatedProduct  = payload.product;

      console.log('payload & state  in save product', {payload, state, originalProduct, updatedProduct});

    return this.productService.save(payload.merchantId, originalProduct, updatedProduct, payload.lang)
  })
  .map(result => this.productActions.saveProductSuccess(result));


@Effect() saveProductSuccess$ = this.update$
  .ofType(ProductActions.SAVE_PRODUCT_SUCCESS)
  .map(result => {
    console.log('save product success action dispatch effect', result.payload);
    let payload = {
      productId: result.payload,
      lang: 'en',
      currency: Currency.SAR
    }
    return this.productActions.getProduct(payload)
  })


@Effect() deleteProduct$ = this.update$
  .ofType(ProductActions.DELETE_PRODUCT)
  .map(action => action.payload)
  .switchMap(productId => this.productService.deleteProduct(productId))
  .map(product => this.productActions.deleteProductSuccess(product));
}
