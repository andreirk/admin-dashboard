/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DriverStatusService } from '../../services/driver-status.service';
import { driverStatusColorsMap, vehicleTypeIconMap } from '../../model/driver-const';
import { DriverViewModelService } from '../../services/driver-view-model.service';

@Component({
  selector: 'am-driver-tabs',
  template: require('./driver-tabs.component.html')
})

export class DriverTabsComponent implements OnInit, OnDestroy {
  private driverId: string;

  private paramsSubscr: Subscription;

  constructor (private route: ActivatedRoute,
               private router: Router,
               private vmService: DriverViewModelService) {
  }

  ngOnInit() {
    const vm = this;
    vm.paramsSubscr = vm.route.params.subscribe(params => {
      this.driverId = params['driverId'];
      if (vm.driverId !== 'new') {
        vm.vmService.updateDriver(parseInt(vm.driverId, 10));
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscr.unsubscribe();
  }

  getStatus(): string {
    return String(DriverStatusService.getStatus(this.vmService.driverLocation)).replace('_', ' ');
  }

  getStatusColor(): string {
    return driverStatusColorsMap.get(DriverStatusService.getStatus(this.vmService.driverLocation));
  }

  getIcon() {
    return vehicleTypeIconMap.get(this.vmService.driver.capacity);
  }

  saveDriver() {
    const vm = this;
    this.vmService.saveDriver().subscribe((driverId) => {
      vm.router.navigate(['../', driverId, 'general'], {relativeTo: vm.route});
    });
  }
}
