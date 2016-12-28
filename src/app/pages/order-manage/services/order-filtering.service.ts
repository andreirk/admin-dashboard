/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { OrderFilterParamsForm } from '../model/order-filter-params-form';
import { OrderFilterParams } from '../model/order-filter-params';
import { OrderStatus, DeliveryStatus } from '../../../shared/types';

export class OrderFilteringService {
  transformFilterParams(filterParamsForm: OrderFilterParamsForm): OrderFilterParams {
    let filterParams: OrderFilterParams = new OrderFilterParams();

    if (filterParamsForm.createdFrom) {
      filterParams.fromDate = new Date(filterParamsForm.createdFrom.year,
          filterParamsForm.createdFrom.month - 1,
          filterParamsForm.createdFrom.day).getTime() / 1000;
    }

    if (filterParamsForm.createdTo) {
      filterParams.toDate = new Date(filterParamsForm.createdTo.year,
          filterParamsForm.createdTo.month - 1,
          filterParamsForm.createdTo.day).getTime() / 1000;
    }

    if (filterParamsForm.orderStatuses) {
      filterParams.statusList = <OrderStatus[]> filterParamsForm.orderStatuses.filter(status => {
        return OrderStatus[status] === String(status);
      });
      if (filterParams.statusList.length == 0) delete filterParams.statusList;

      filterParams.deliveryStatusList = <DeliveryStatus[]> filterParamsForm.orderStatuses.filter(status => {
        return DeliveryStatus[status] === String(status);
      });
      if (filterParams.deliveryStatusList.length == 0) delete filterParams.deliveryStatusList;
    }
    return filterParams;
  }

}

