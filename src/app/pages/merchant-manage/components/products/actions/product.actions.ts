/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';


@Injectable()
export class ProductActions {
  static LOAD_PRODUCTS = '[Product] Load Products';
  loadProducts(payload): Action {

    const action = {
      type: ProductActions.LOAD_PRODUCTS,
      payload
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static LOAD_PRODUCTS_SUCCESS = '[Product] Load Products Success';
  loadProductsSuccess(products): Action {

    const action = {
      type: ProductActions.LOAD_PRODUCTS_SUCCESS,
      payload: products
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static GET_PRODUCT = '[Product] Get Product';
  getProduct(payload): Action {

    const action = {
      type: ProductActions.GET_PRODUCT,
      payload
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static GET_PRODUCT_SUCCESS = '[Product] Get Product Success';
  getProductSuccess(product): Action {

    const action = {
      type: ProductActions.GET_PRODUCT_SUCCESS,
      payload: product
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static RESET_BLANK_PRODUCT = '[Product] Reset Blank Product';
  resetBlankProduct(): Action {


    const action = {
      type: ProductActions.RESET_BLANK_PRODUCT
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static SAVE_PRODUCT = '[Product] Save Product';
  saveProduct(product): Action {

    const action = {
      type: ProductActions.SAVE_PRODUCT,
      payload: product
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static SAVE_PRODUCT_SUCCESS = '[Product] Save Product Success';
  saveProductSuccess(product): Action {

    const action = {
      type: ProductActions.SAVE_PRODUCT_SUCCESS,
      payload: product
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static ADD_PRODUCT = '[Product] Add Product';
  addProduct(product): Action {

    const action = {
      type: ProductActions.ADD_PRODUCT,
      payload: product
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static ADD_PRODUCT_SUCCESS = '[Product] Add Product Success';
  addProductSuccess(product): Action {

    const action = {
      type: ProductActions.ADD_PRODUCT_SUCCESS,
      payload: product
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static DELETE_PRODUCT = '[Product] Delete Product';
  deleteProduct(product): Action {

    const action = {
      type: ProductActions.DELETE_PRODUCT,
      payload: product
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }

  static DELETE_PRODUCT_SUCCESS = '[Product] Delete Product Success';
  deleteProductSuccess(product): Action {

    const action = {
      type: ProductActions.DELETE_PRODUCT_SUCCESS,
      payload: product
    };

    console.log(`ACTION: ${action.type} dispatched`, {action});

    return action;
  }
}
