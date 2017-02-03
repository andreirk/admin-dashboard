/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Action } from '@ngrx/store';

import { Merchant } from '../../../commons/model/merchant';
import { MerchantActions } from '../actions/merchant-actions';

export type MerchantState = Merchant;


const initialState: MerchantState = {
  enabled: null,
  imageUrl: null,
  defaultProductImageUrl: null,
  name: null,
  description: null,
  id : null
};

export default function (state = initialState, action: Action): MerchantState {
  switch (action.type) {

    case MerchantActions.GET_MERCHANT_SUCCESS: {
      const newState =  _.cloneDeep(action.payload);

      console.log('in get merchant success REDUCER', {
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
