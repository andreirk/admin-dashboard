/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Action } from '@ngrx/store';
import { ProductOptionActions } from '../actions';
import * as _ from 'lodash';
import { ProductOption } from '../../../../../commons/model/product-option';

export type ProductOptionListState = ProductOption[];


const initialState: ProductOptionListState = [];


export default function (state = initialState, action: Action): ProductOptionListState {
  switch (action.type) {
    case ProductOptionActions.LOAD_PRODUCT_OPTIONS_SUCCESS: {
      return action.payload.content;
    }

    case ProductOptionActions.ADD_PRODUCT_OPTION_SUCCESS: {
      return [...state, action.payload];
    }

    case ProductOptionActions.SAVE_PRODUCT_OPTION_SUCCESS: {
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
    case ProductOptionActions.DELETE_PRODUCT_OPTION_SUCCESS: {

      const newState = state.filter(productOption => {
        return productOption.id !== action.payload.productOptionId;
      });

      console.log('in delete reducer success', {state, action, newState})
      return newState;
    }
    default: {
      return state;
    }
  }
}
