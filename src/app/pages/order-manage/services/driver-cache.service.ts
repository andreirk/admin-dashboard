/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DriverService } from '../../../core/services/drivers/driver.service';
import { DriverProfile } from '../../../commons/model/driver-profile';

@Injectable()
export class DriverCacheService {
  private drivers: Map<number, Observable<DriverProfile>> = new Map();

  constructor(private driverService: DriverService) {
  }

  getDriver(driverId: number): Observable<DriverProfile> {
    const vm = this;
    if (!vm.drivers.get(driverId)) {
      vm.drivers.set(driverId, vm.driverService.getProfile(String(driverId))
        .publishReplay(1)
        .refCount());
    }
    return vm.drivers.get(driverId);
  }

}
