import { SectionType, CategoryType } from '../../../../../shared/types';

export class Category {
  public id: string = '';
  public description: string = '';
  public imageUrl: string  = '';
  public name: string  = '';
  public sectionType: SectionType = SectionType.deals;
  public sortOrder: number  = 0;
  public type: CategoryType  = CategoryType.REGULAR;

  constructor() {  }
}
