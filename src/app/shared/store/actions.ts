/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Action } from "@ngrx/store";
import {AllMerchantData} from "../transferObjects/all-merchant-data";


export const LOAD_MERCHANTS_ACTION = 'LOAD_MERCHANTS_ACTION'

export class LoadUserThreadsAction implements Action {
  readonly type = LOAD_MERCHANTS_ACTION;

  constructor(public payload?: AllMerchantData){

  }
}
