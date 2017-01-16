/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { OrderFilterParamsForm } from '../model/order-filter-params-form';
import { OrderFilterParams } from '../model/order-filter-params';
import { OrderStatus, DeliveryStatus } from '../../../shared/types';
import { Observable } from 'rxjs';
import { OrderFilterPersons } from '../model/order-filter-persons';
import { UserService } from '../../../core/services/users/user.service';
import { DriverService } from '../../../core/services/drivers/driver.service';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderFilteringService {
  constructor(private userService: UserService,
      private driverService: DriverService) { }

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

  getPersons(searchText: string) : Observable<OrderFilterPersons> {
    const vm = this;
    if (!searchText || searchText === '') {
      return Observable.of(new OrderFilterPersons());
    }
    return Observable.combineLatest(
      vm.userService.getPage(0, 10, searchText),
      vm.driverService.getProfilesPage(0, 10, { searchPattern: searchText }),
      (pageUser, pageDriver) => {
        return <OrderFilterPersons> {
          users: pageUser,
          drivers: pageDriver
        }
      }
    );
  }

}

