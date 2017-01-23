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
      filterParams.fromDate = new Date(filterParamsForm.fromDate.year,
          filterParamsForm.fromDate.month - 1,
          filterParamsForm.fromDate.day).getTime() / 1000;
    }

    if (filterParamsForm.toDate) {
      filterParams.toDate = new Date(filterParamsForm.toDate.year,
          filterParamsForm.toDate.month - 1,
          filterParamsForm.toDate.day).getTime() / 1000;
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
