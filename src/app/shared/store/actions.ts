/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Action } from "@ngrx/store";
import { AllUserData } from "../transferObjects/all-user-data";


export const PRODUCTS_LOADED_ACTION = 'PRODUCTS_LOADED_ACTION';

export class productsLoadedAction implements Action {

  readonly type = PRODUCTS_LOADED_ACTION;

  constructor(public payload?: AllUserData) {

  }
}

export const LOAD_PRODUCTS_ACTION = "LOAD_PRODUCTS_ACTION";

export class LoadProductsAction implements Action {
  readonly type = LOAD_PRODUCTS_ACTION;

  constructor(public payload?: any){}
}


export const PRODUCT_DELETE_ACTION = 'PRODUCT_DELETE_ACTION'

export class ProductDeleteAction implements Action {

  readonly type = PRODUCT_DELETE_ACTION

  constructor(public payload: number){}
}

export const DELETE_PRODUCT_SUCCESS_ACTION = 'DELETE_PRODUCT_SUCCESS_ACTION';

export class ProductDeleteSuccessAction implements Action {
    readonly type = DELETE_PRODUCT_SUCCESS_ACTION;

    constructor(public payload?: any){}
}
