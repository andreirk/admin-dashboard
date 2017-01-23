/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { DriverBalanceRecordType, Currency } from '../../../shared/types';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IMultiSelectOption } from '../../../shared/components/multiselect-dropdown.component';

export class BalanceRecordFilterParamsForm {
  public deliveryId: string = '';
  public fromDate: NgbDateStruct;
  public toDate: NgbDateStruct;
  public currency: Currency = Currency.SAR;
  public types: IMultiSelectOption[] = [];
}
