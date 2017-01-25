/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { DriverStatus } from '../../../shared/types';
import { DriverLocation } from '../../../commons/model/driver/driver-location';
import { DriverStatusFilter } from '../model/driver-status-filter';

export class DriverStatusService {
  static getStatus(driverLocation: DriverLocation): DriverStatus {
    if (!driverLocation) {
      return DriverStatus.OFFLINE;
    }
    if (driverLocation.status == 1) {
      return (driverLocation.orderId) ? DriverStatus.ORDER_EXECUTION : DriverStatus.READY;
    } else {
      return (driverLocation.orderId) ? DriverStatus.ORDER_OFFLINE : DriverStatus.OFFLINE;
    }
  }

  static getStatusFilter(driverStatus: DriverStatus): DriverStatusFilter {
    switch(driverStatus) {
      case DriverStatus.READY: return  { online: true, hasOrder: false };
      case DriverStatus.ORDER_EXECUTION: return  { online: true, hasOrder: true };
      case DriverStatus.OFFLINE: return  { online: false, hasOrder: false };
      case DriverStatus.ORDER_OFFLINE: return  { online: false, hasOrder: true };
    }
  }
}
