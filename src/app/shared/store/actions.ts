/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Action } from "@ngrx/store";
import { AllUserData } from "../transferObjects/all-user-data";


export const LOAD_PRODUCTS_ACTION = 'LOAD_PRODUCTS_ACTION';

export class productsLoadedAction implements Action {

  readonly type = LOAD_PRODUCTS_ACTION;

  constructor(public payload?: AllUserData) {

  }
}
