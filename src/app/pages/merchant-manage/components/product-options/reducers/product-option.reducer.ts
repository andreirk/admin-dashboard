/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import {Action} from '@ngrx/store';
import { ProductOptionActions } from '../actions';
import { Product, ProductAttributes, Price, ProductSelectedImage } from "../../../../../commons/model/product";
import { ProductOption } from '../../../../../commons/model/product-option';

export type ProducOptiontState = ProductOption;


const initialState: ProducOptiontState = {
   id : '',
   multiselect : true,
   name : '',
   required : true,
   title: '',
   values: [],

};

export default function (state = initialState, action: Action): ProducOptiontState {
  switch (action.type) {
    case ProductOptionActions.RESET_BLANK_PRODUCT_OPTION: {

      const newState = initialState;
      console.log('in  RESET_BLANK_PRODUCT_OPTION REDUCER', {
        state,
        action,
        newState
      });
      return newState;
    }
    case ProductOptionActions.GET_PRODUCT_OPTION_SUCCESS: {
      const newState =  _.cloneDeep(action.payload.productOption);
      newState.values = _.cloneDeep(action.payload.values);

      console.log('in get productOption success REDUCER', {
        state,
        action,
        newState
      });
      console.log('new state productOption json', JSON.stringify(newState))
       return newState;
    }

    default: {
      return state;
    }
  }
}
