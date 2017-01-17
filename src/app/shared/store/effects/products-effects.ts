/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { ProductService } from "../../../core/services/products/products-service";
import { Actions, Effect } from "@ngrx/effects";
import {
  LOAD_PRODUCTS_ACTION, productsLoadedAction, PRODUCT_DELETE_ACTION,
  ProductDeleteSuccessAction
} from "../actions";

@Injectable()
export class ProductsEffectsService {

    constructor(private actions$: Actions, private productService: ProductService ) {

    }

    @Effect() products$ = this.actions$
      .ofType(LOAD_PRODUCTS_ACTION)
      .map(action => action.payload)
      .switchMap((payload) => {
        const options = {
          'merchant-id' : payload.merchantId,
          'currency' : 'USD',
          'available' : true,
          'page': 0,
          'size': 20,
          'sort': 'name'
        };
        return this.productService.getProducts(options, 'en')
      })
      .map(allUserData => new productsLoadedAction(allUserData))


    @Effect() deleteHero$ = this.actions$
      .ofType(PRODUCT_DELETE_ACTION)
      .map(action => action.payload)
      .switchMap(productId => this.productService.deleteProduct(productId))
      .map(response => new ProductDeleteSuccessAction(response.id));


}
