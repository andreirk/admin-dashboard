/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Action } from '@ngrx/store';
import { ProductActions } from '../actions';
import * as _ from 'lodash';
import { Product } from '../../../../../commons/model/product';

export type ProductListState = Product[];

const initialState: ProductListState = [];

export default function (state = initialState, action: Action): ProductListState {
  switch (action.type) {
    case ProductActions.LOAD_PRODUCTS_SUCCESS: {
      return action.payload.content;
    }
    case ProductActions.ADD_PRODUCT_SUCCESS: {
      return [...state, action.payload];
    }
    case ProductActions.SAVE_PRODUCT_SUCCESS: {
      let index = _.findIndex(state, {id: action.payload.id});
      console.log('in product list reducer index:' ,{index, action})
      let newState = [];
      if (index >= 0) {
        newState = [
          ...state.slice(0, index),
          action.payload,
          ...state.slice(index + 1)
        ];
      }

      return newState

    }
    case ProductActions.DELETE_PRODUCT_SUCCESS: {

      const newState = state.filter(product => {
        return product.id !== action.payload;
      });

      return newState;
    }
    default: {
      return state;
    }
  }
}
