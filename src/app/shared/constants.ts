/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { LangObj } from './objects';
import { CategoryType } from './types';

export const LANGUAGES: LangObj[] = [
  new LangObj('en', 'English'),
  new LangObj('ar', 'Arabic')
];

export const MerchantLinkableRootCategories: CategoryType[] = [
  CategoryType.REGULAR, CategoryType.MEAL
];
