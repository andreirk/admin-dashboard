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
      filterParams.statusList = <OrderStatus[]> filterParamsForm.orderStatuses.filter(status => {
        return OrderStatus[status] === String(status);
      });
      if (filterParams.statusList.length == 0) delete filterParams.statusList;

      filterParams.deliveryStatusList = <DeliveryStatus[]> filterParamsForm.orderStatuses.filter(status => {
        return DeliveryStatus[status] === String(status);
      });
      if (filterParams.deliveryStatusList.length == 0) delete filterParams.deliveryStatusList;
    }

    if (filterParamsForm.orderPersons) {
      filterParamsForm.orderPersons.forEach(personId => {
          if (personId.startsWith('usr')) {
            filterParams.peerId = personId.substring(3);
          } else if (personId.startsWith('drv')) {
            filterParams.driverId = parseInt(personId.substring(3), 10);
          }
        }
      );
    }

    return filterParams;
  }

  getPersons(searchText: string) : Observable<OrderFilterPersons> {
    const vm = this;
    return Observable.combineLatest(
      vm.userService.getPage(0, 20, searchText),
      vm.driverService.getProfilesPage(0, 20, { searchPattern: searchText }),
      (pageUser, pageDriver) => {
        return <OrderFilterPersons> {
          users: pageUser,
          drivers: pageDriver
        }
      }
    );
  }

}

