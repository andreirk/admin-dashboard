/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { LangObj } from "../objects";

export interface UiState {
  userId: number;
  currentLanguage: LangObj;
}

export const INITIAL_UI_STATE: UiState = {
  userId: 1,
  currentLanguage: new LangObj('en', 'English'),

}
