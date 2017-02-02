/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';


@Injectable()
export class ProductOptionActions {


  static GET_PRODUCT_OPTION_LIST = '[ProductOptions] Load ProductOption Options';
  getProductOptionList(payload): Action {

    const action = {
      type: ProductOptionActions.GET_PRODUCT_OPTION_LIST,
      payload
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static LOAD_PRODUCT_OPTIONS_SUCCESS = '[ProductOptions] Load ProductOptions Success';
  getProductOptionListSuccess(productOptions): Action {

    const action = {
      type: ProductOptionActions.LOAD_PRODUCT_OPTIONS_SUCCESS,
      payload: productOptions
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static GET_A_PRODUCT_OPTION = '[ProductOptions] Get ProductOption';
  getProductOption(payload): Action {

    const action = {
      type: ProductOptionActions.GET_A_PRODUCT_OPTION,
      payload
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static GET_PRODUCT_OPTION_SUCCESS = '[ProductOptions] Get ProductOption Success';
  getProductOptionOneSuccess(productOption): Action {

    const action = {
      type: ProductOptionActions.GET_PRODUCT_OPTION_SUCCESS,
      payload: productOption
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static RESET_BLANK_PRODUCT_OPTION = '[ProductOptions] Reset Blank ProductOption';
  resetBlankProductOption(): Action {

    const action = {
      type: ProductOptionActions.RESET_BLANK_PRODUCT_OPTION
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }


  static SAVE_PRODUCT_OPTION = '[ProductOptions] Save ProductOption';
  saveProductOption(productOption): Action {

    const action = {
      type: ProductOptionActions.SAVE_PRODUCT_OPTION,
      payload: productOption
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static SAVE_PRODUCT_OPTION_SUCCESS = '[ProductOptions] Save ProductOption Success';
  saveProductOptionSuccess(productOption): Action {

    const action = {
      type: ProductOptionActions.SAVE_PRODUCT_OPTION_SUCCESS,
      payload: productOption
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static ADD_PRODUCT_OPTION = '[ProductOptions] Add ProductOption';
  addProductOption(productOption): Action {

    const action = {
      type: ProductOptionActions.ADD_PRODUCT_OPTION,
      payload: productOption
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static ADD_PRODUCT_OPTION_SUCCESS = '[ProductOptions] Add ProductOption Success';
  addProductOptionSuccess(productOption): Action {

    const action = {
      type: ProductOptionActions.ADD_PRODUCT_OPTION_SUCCESS,
      payload: productOption
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static DELETE_PRODUCT_OPTION = '[ProductOptions] Delete ProductOption';
  deleteProductOption(productOption): Action {

    const action = {
      type: ProductOptionActions.DELETE_PRODUCT_OPTION,
      payload: productOption
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static DELETE_PRODUCT_OPTION_SUCCESS = '[ProductOptions] Delete ProductOption Success';
  deleteProductOptionSuccess(productOption): Action {

    const action = {
      type: ProductOptionActions.DELETE_PRODUCT_OPTION_SUCCESS,
      payload: productOption
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static ERROR_OCCURED = '[ProductOptions] Error';
  errorOccured(err): Action {
    const action = {
      type: ProductOptionActions.ERROR_OCCURED,
      payload: err
    }

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  ///////////////////////
}
