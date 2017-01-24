/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { OrderFilterParamsForm } from '../model/order-filter-params-form';
import { OrderFilterParams } from '../model/order-filter-params';
import { OrderStatus, DeliveryStatus } from '../../../shared/types';
import { Injectable } from '@angular/core';
import { IMultiSelectOption } from '../../../shared/components/multiselect-dropdown.component';
import {DriverService} from "../../../core/services/drivers/driver.service";
import {OrderPersonMultiselectComponent} from "../components/order-person-multiselect.component";

@Injectable()
export class OrderFilteringService {
  constructor(private driverService: DriverService) { }

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
      filterParams.statusList = <OrderStatus[]> filterParamsForm.orderStatuses
        .map(statusOption => statusOption.id)
        .filter(status => OrderStatus[status] === String(status));
      if (filterParams.statusList.length == 0) delete filterParams.statusList;

      filterParams.deliveryStatusList = <DeliveryStatus[]> filterParamsForm.orderStatuses
        .map(statusOption => statusOption.id)
        .filter(status => DeliveryStatus[status] === String(status));
      if (filterParams.deliveryStatusList.length == 0) delete filterParams.deliveryStatusList;
    }

    if (filterParamsForm.orderPersons) {
      filterParamsForm.orderPersons.forEach(personOption => {
          if (personOption.group === 'usr') {
            filterParams.peerId = personOption.id;
          } else if (personOption.group === 'drv') {
            filterParams.driverId = parseInt(personOption.id, 10);
          }
        }
      );
    }

    return filterParams;
  }

  transformFilterParamsForm(filterParams: OrderFilterParams): OrderFilterParamsForm {
    const vm = this;
    let filterParamsForm: OrderFilterParamsForm = new OrderFilterParamsForm();
    if (filterParams.driverId) {
      vm.driverService.getProfile(filterParams.driverId).subscribe(driver => {
        filterParamsForm.orderPersons.push(OrderPersonMultiselectComponent.driverOption(driver));
      });
    }
    return filterParamsForm;
  }
}

