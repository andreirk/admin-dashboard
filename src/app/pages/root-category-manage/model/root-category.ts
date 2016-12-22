/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { SectionType, CategoryType } from '../../../shared/types';

export class RootCategory {
  public id: string = '';
  public name: string = '';
  public description: string = '';
  public imageUrl: string = '';
  public sectionType: SectionType = SectionType.deals;
  public sortOrder: number = 0;
  public type: CategoryType = CategoryType.REGULAR;

  constructor() {
  }
}
