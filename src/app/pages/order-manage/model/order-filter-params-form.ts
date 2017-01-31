/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { IMultiSelectOption } from '../../../shared/components/multiselect-dropdown.component';

export class OrderFilterParamsForm {
  public orderStatuses: IMultiSelectOption[] = [];
  public orderPersons: IMultiSelectOption[] = [];
  public createdFrom: number;
  public createdTo: number;

  constructor() {
  }
}
