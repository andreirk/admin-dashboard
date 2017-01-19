/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import {Action} from '@ngrx/store';
import {ProductActions} from '../actions';
import { Product, Attributes, Price } from "../../../../../commons/model/product";

export type ProductState = Product;

const initialState: ProductState = {
  attributes : new Attributes(),
  available : true,
  categoryId : '',
  groupIds  : [],
  description : '',
  imageUrl: '',
  marketingAttribute: '',
  mediaResources : [],
  merchantId  : '',
  name : '',
  packageType: '',
  price : new Price(),
  tagValues : [],
  tags : [],
  upc : '',
  defaultProductImageUrl : '',
  id : ''
};

export default function (state = initialState, action: Action): ProductState {
  switch (action.type) {
    case ProductActions.RESET_BLANK_PRODUCT: {
      return initialState;
    }
    case ProductActions.GET_PRODUCT_SUCCESS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
