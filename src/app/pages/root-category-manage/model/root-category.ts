/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { SectionType, RootCategoryType } from '../../../shared/types';

export class RootCategory {
  public id: string = '';
  public name: string = '';
  public description: string = '';
  public imageUrl: string = '';
  public sectionType: SectionType;
  public sortOrder: number;
  public type: RootCategoryType;

  constructor() {
  }
}
