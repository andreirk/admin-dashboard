/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import {UiState, INITIAL_UI_STATE} from "./ui-state";

import {StoreData, INITIAL_STORE_DATA} from "./store.data";

export interface AppState {
  uiState: UiState,
  storeData: StoreData
}

export const INITIAL_APP_STATE: AppState = {
  uiState: INITIAL_UI_STATE ,
  storeData: INITIAL_STORE_DATA ,
}
