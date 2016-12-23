/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Lang } from './objects';
import { CategoryType } from './types';

export const LANGUAGES: Lang[] = [
  new Lang('en', 'English'),
  new Lang('ar', 'Arabic')
];

export const MerchantLinkableRootCategories: CategoryType[] = [
  CategoryType.REGULAR, CategoryType.MEAL
];
