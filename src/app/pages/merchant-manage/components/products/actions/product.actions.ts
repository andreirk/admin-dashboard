/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';


@Injectable()
export class ProductActions {
  static LOAD_PRODUCTS = '[Product] Load Products';
  loadProducts(payload): Action {
    return {
      type: ProductActions.LOAD_PRODUCTS,
      payload
    };
  }

  static LOAD_PRODUCTS_SUCCESS = '[Product] Load Products Success';
  loadProductsSuccess(products): Action {
    return {
      type: ProductActions.LOAD_PRODUCTS_SUCCESS,
      payload: products
    };
  }

  static GET_PRODUCT = '[Product] Get Product';
  getProduct(id): Action {
    return {
      type: ProductActions.GET_PRODUCT,
      payload: id
    };
  }

  static GET_PRODUCT_SUCCESS = '[Product] Get Product Success';
  getProductSuccess(product): Action {
    return {
      type: ProductActions.GET_PRODUCT_SUCCESS,
      payload: product
    };
  }

  static RESET_BLANK_PRODUCT = '[Product] Reset Blank Product';
  resetBlankProduct(): Action {
    return {
      type: ProductActions.RESET_BLANK_PRODUCT
    };
  }

  static SAVE_PRODUCT = '[Product] Save Product';
  saveProduct(product): Action {
    return {
      type: ProductActions.SAVE_PRODUCT,
      payload: product
    };
  }

  static SAVE_PRODUCT_SUCCESS = '[Product] Save Product Success';
  saveProductSuccess(product): Action {
    return {
      type: ProductActions.SAVE_PRODUCT_SUCCESS,
      payload: product
    };
  }

  static ADD_PRODUCT = '[Product] Add Product';
  addProduct(product): Action {
    return {
      type: ProductActions.ADD_PRODUCT,
      payload: product
    };
  }

  static ADD_PRODUCT_SUCCESS = '[Product] Add Product Success';
  addProductSuccess(product): Action {
    return {
      type: ProductActions.ADD_PRODUCT_SUCCESS,
      payload: product
    };
  }

  static DELETE_PRODUCT = '[Product] Delete Product';
  deleteProduct(product): Action {
    return {
      type: ProductActions.DELETE_PRODUCT,
      payload: product
    };
  }

  static DELETE_PRODUCT_SUCCESS = '[Product] Delete Product Success';
  deleteProductSuccess(product): Action {
    return {
      type: ProductActions.DELETE_PRODUCT_SUCCESS,
      payload: product
    };
  }
}
