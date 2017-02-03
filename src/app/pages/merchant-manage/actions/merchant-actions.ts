/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';


@Injectable()
export class MerchantActions {

  static GET_MERCHANT_SUCCESS = '[Merchant] Load Merchant ID Success';
  getMerchantSuccess(merchant): Action {

    const action = {
      type: MerchantActions.GET_MERCHANT_SUCCESS,
      payload: merchant
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }


  ///////////////////////
}
