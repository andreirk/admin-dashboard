/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { BalanceRecordFilterParams } from '../model/balance-record-filter-params';
import { BalanceRecordFilterParamsForm } from '../model/balance-record-filter-params-form';

export class BalanceRecordFilteringService {
  transformFilterParams(filterParamsForm: BalanceRecordFilterParamsForm, driverId: number): BalanceRecordFilterParams {
    let filterParams: BalanceRecordFilterParams = new BalanceRecordFilterParams();
    filterParams.driverId = driverId;

    if (filterParamsForm.fromDate) {
      filterParams.fromDate = filterParamsForm.fromDate;
    }

    if (filterParamsForm.toDate) {
      filterParams.toDate = filterParamsForm.toDate + 60*60*24 - 1; // to date inclusive
    }

    if (filterParamsForm.deliveryId !== '') {
      filterParams.deliveryId = filterParamsForm.deliveryId;
    }

    if (filterParamsForm.types.length > 0) {
      filterParams.types = filterParamsForm.types.map(option => option.id);
    }

    return filterParams;
  }
}
