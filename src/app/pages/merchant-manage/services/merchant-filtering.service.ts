/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { MerchantFilterParams } from '../model/merchant-filter-params';
import { MerchantFilterParamsForm } from '../model/merchant-filter-params-form';

export class MerchantFilteringService {
  transformFilterParams(filterParamsForm: MerchantFilterParamsForm): MerchantFilterParams {
    let result: MerchantFilterParams = new MerchantFilterParams();

    if (filterParamsForm.name && filterParamsForm.name !== '') {
      result.name = '%' + filterParamsForm.name + '%';
    }

    return result;
  }
}
