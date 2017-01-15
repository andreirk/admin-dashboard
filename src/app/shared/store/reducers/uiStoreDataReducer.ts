/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */


import { StoreData, INITIAL_STORE_DATA } from "../store.data";
import { Action } from "@ngrx/store";
import {
  PRODUCTS_LOADED_ACTION, productsLoadedAction, PRODUCT_DELETE_ACTION,
  DELETE_PRODUCT_SUCCESS_ACTION, ProductDeleteSuccessAction
} from "../actions";

export function storeData(state: StoreData = INITIAL_STORE_DATA, action: Action): StoreData {
  switch (action.type) {
    case PRODUCTS_LOADED_ACTION:
      return handleLoadProductsAction(state, action);
    case DELETE_PRODUCT_SUCCESS_ACTION:


      return handleProductDeleteSuccessAction(state, action);

    default:
      return state;
  }
}

function handleLoadProductsAction(state: StoreData,
                                  action: productsLoadedAction): StoreData {

  return {
    products: {
      content: action.payload.content,
      total: action.payload.total
    }
  };

}

function handleProductDeleteSuccessAction(state: StoreData, action: ProductDeleteSuccessAction){

  const newState = Object.assign({}, state);

  const content = state.products.content
      .filter(product => product.id !== action.payload)

  return  {
    products: {
        content: content,
        total: action.payload.total
    }
  }

}
