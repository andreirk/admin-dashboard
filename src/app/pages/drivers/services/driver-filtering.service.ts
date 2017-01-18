/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { DriverFilterParams } from '../model/driver-filter-params';
import { DriverFilterParamsForm } from '../model/driver-filter-params-form';

export class DriverFilteringService {
  transformFilterParams(filterParamsForm: DriverFilterParamsForm): DriverFilterParams {
    let result: DriverFilterParams = new DriverFilterParams();
    result.searchPattern = filterParamsForm.searchPattern;
    if (filterParamsForm.orderId) {
      result.orderId = filterParamsForm.orderId;
    }
    return result;
  }
}
