/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { DriverFilterParams } from '../model/driver-filter-params';
import { DriverFilterParamsForm } from '../model/driver-filter-params-form';

export class DriverFilteringService {
  transformFilterParams(filterParamsForm: DriverFilterParamsForm): DriverFilterParams {
    let result: DriverFilterParams = new DriverFilterParams();
    if (filterParamsForm.searchPattern) {
      result.searchPattern = filterParamsForm.searchPattern;
    }
    if (filterParamsForm.orderId) {
      result.orderId = filterParamsForm.orderId;
    }
    return result;
  }

  transformFilterParamsForm(filterParams: DriverFilterParams): DriverFilterParamsForm {
    let result: DriverFilterParamsForm = new DriverFilterParamsForm();
    if (filterParams.searchPattern) {
      result.searchPattern = filterParams.searchPattern;
    }
    if (filterParams.orderId) {
      result.orderId = filterParams.orderId;
    }
    return result;
  }
}
