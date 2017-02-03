/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import merchantReducer, * as fromMerchant from '../reducers/merchant-reducer'

import productListReducer, * as fromProductList from '../components/products/reducers/product-list-reducer';
import productReducer, * as fromProduct from '../components/products/reducers/product-reducer';

import productOptionListReducer, * as fromProductOptionList from '../components/product-options/reducers/product-option-list-reducer';
import productOptionReducer, * as fromProductOption from '../components/product-options/reducers/product-option.reducer';



import { RouterState, routerReducer } from '@ngrx/router-store';

export interface MerchantProductAppState {
  router: RouterState,

  merchant: fromMerchant.MerchantState,

  products: fromProductList.ProductListState,
  product: fromProduct.ProductState,

  productOptions: fromProductOptionList.ProductOptionListState,
  productOption: fromProductOption.ProducOptiontState,

};


// export default compose(storeLogger(), combineReducers)({
export default compose(combineReducers)({
  router: routerReducer,

  merchant: merchantReducer,

  products: productListReducer,
  product: productReducer,

  productOptions: productOptionListReducer,
  productOption: productOptionReducer
});
