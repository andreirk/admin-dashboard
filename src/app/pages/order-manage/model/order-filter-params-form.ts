/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IMultiSelectOption } from '../../../shared/components/multiselect-dropdown.component';

export class OrderFilterParamsForm {
  public orderStatuses: IMultiSelectOption[] = [];
  public orderPersons: IMultiSelectOption[] = [];
  public createdFrom: NgbDateStruct;
  public createdTo: NgbDateStruct;

  constructor() {
  }
}
