/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
// import { storeLogger } from 'ngrx-store-logger';
import { combineReducers } from '@ngrx/store';

import productListReducer, * as fromProductList from './product-list-reducer';
import productReducer, * as fromProduct from './product.reducer';

export interface AppState {
  products: fromProductList.ProductListState;
  product: fromProduct.ProductState;
};


// export default compose(storeLogger(), combineReducers)({
export default compose(combineReducers)({
  products: productListReducer,
  product: productReducer
});
