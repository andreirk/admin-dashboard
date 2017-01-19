/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';

import {AppState} from '../reducers';
import { ProductService } from "../../../../../core/services/products/products-service";
import { ProductActions } from "../actions/product.actions";
import { Currency } from "../../../../../shared/types";

@Injectable()
export class ProductEffects {
  constructor (
    private update$: Actions,
    private productActions: ProductActions,
    private productService: ProductService,
) {}

@Effect() loadProducts$ = this.update$
  .ofType(ProductActions.LOAD_PRODUCTS)
  .map(action => action.payload)
  .switchMap(() => this.productService.getPage(0, 1000, 'en', Currency.USD, {}))
  .map(products => this.productActions.loadProductsSuccess(products));

@Effect() getProduct$ = this.update$
  .ofType(ProductActions.GET_PRODUCT)
  .map(action => action.payload)
  .switchMap(product => this.productService.getOne(product.id, {}, product.lang))
  .map(product => this.productActions.getProductSuccess(product));

@Effect() saveProduct$ = this.update$
  .ofType(ProductActions.SAVE_PRODUCT)
  .map(action => action.payload)
  .switchMap(payload => this.productService.saveProduct(payload.merchantId, payload.product, payload.productOriginal, payload.lang))
  .map(product => this.productActions.saveProductSuccess(product));

@Effect() addProduct$ = this.update$
  .ofType(ProductActions.ADD_PRODUCT)
  .map(action => action.payload)
  .switchMap(payload => this.productService.saveProduct(payload.merchantId, payload.product, payload.productOriginal, payload.lang ))
  .map(product => this.productActions.addProductSuccess(product));

@Effect() deleteProduct$ = this.update$
  .ofType(ProductActions.DELETE_PRODUCT)
  .map(action => action.payload)
  .switchMap(product => this.productService.deleteProduct(product))
  .map(product => this.productActions.deleteProductSuccess(product));
}
