/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Currency } from '../../../shared/types';
import { IMultiSelectOption } from '../../../shared/components/multiselect-dropdown.component';

export class BalanceRecordFilterParamsForm {
  public deliveryId: string = null;
  public fromDate: number;
  public toDate: number;
  public currency: Currency = Currency.SAR;
  public types: IMultiSelectOption[] = [];
}
