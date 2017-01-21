/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';

import {MerchantProductAppState} from '../reducers';
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
  .switchMap(payload => {
    console.log('in get pruduct effect payload', payload);
    return this.productService.getOne(payload.id, payload.lang, {currency: payload.currency})
  })
  .map(product => {
    console.log('in get product effect after service call ', product);
    return this.productActions.getProductSuccess(product)
  });

@Effect() saveProduct$ = this.update$
  .ofType(ProductActions.SAVE_PRODUCT)
  .map(action => action.payload)
  .switchMap(payload => this.productService.save(payload.merchantId, payload.product, payload.lang))
  .map(product => this.productActions.saveProductSuccess(product));


// @Effect() saveProduct$ = this.update$
//   .ofType( ProductActions.SAVE_PRODUCT )
//   .map(action => action.payload)
//   .switchMap(
//     ( payload ) => {
//       return this.productService.saveProduct(payload.merchantId, payload.product, payload.productOriginal, payload.lang) // get productId
//     }
//   )
//   .mergeMap(
//     ( productId ) => {
//       const updateAttributes$ = this.productService.updateAttributes(productId, payload.product, payload.productOriginal, payload.lang)
//
//       const updateAllFields$ =
//       return Observable.combineLatest(
//         vm.getAccount(id),
//         vm.getProfile(id),
//         (account, profile) => {
//           return  <Driver> {
//             account: account,
//             profile: profile
//           };
//         }
//       );
//     }
//
//       return Observable.forkJoin
//       return Observable.from([ this.productActions.updateProductAttributes( productId ), this.productActions.updateProductAttributesComplete() ]);
//     }
//   );

@Effect() addProduct$ = this.update$
  .ofType(ProductActions.ADD_PRODUCT)
  .map(action => action.payload)
  .switchMap(payload => this.productService.save(payload.merchantId, payload.product, payload.lang ))
  .map(product => this.productActions.addProductSuccess(product));

@Effect() deleteProduct$ = this.update$
  .ofType(ProductActions.DELETE_PRODUCT)
  .map(action => action.payload)
  .switchMap(productId => this.productService.deleteProduct(productId))
  .map(product => this.productActions.deleteProductSuccess(product));
}
