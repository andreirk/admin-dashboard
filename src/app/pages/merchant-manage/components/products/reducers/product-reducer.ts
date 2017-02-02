/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Action } from '@ngrx/store';
import { ProductActions } from '../actions';
import { Product, ProductAttributes, Price, ProductSelectedImage } from '../../../../../commons/model/product';

export type ProductState = Product;


const initialState: ProductState = {
  attributes : new ProductAttributes(),
  available : true,
  categoryId : '',
  groupIds  : [],
  description : '',
  imageUrl: '',
  marketingAttribute: '',
  mediaResources : [],
  merchantId  : '',
  packageType: '',
  price : new Price(),
  tagValues : [],
  tags : [],
  upc : '',
  defaultProductImageUrl : '',
  selectedImage: new ProductSelectedImage(),
  id : ''
};

export default function (state = initialState, action: Action): ProductState {
  switch (action.type) {
    case ProductActions.RESET_BLANK_PRODUCT: {

      const newState = initialState;
      console.log('in  RESET_BLANK_PRODUCT REDUCER', {
        state,
        action,
        newState
      });
      return newState;
    }
    case ProductActions.GET_PRODUCT_SUCCESS: {
      const newState =  _.cloneDeep(action.payload);

      console.log('in get product success REDUCER', {
        state,
        action,
        newState
      });

       return newState;
    }

    default: {
      return state;
    }
  }
}
