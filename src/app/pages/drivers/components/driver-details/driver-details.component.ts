/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCacheService } from '../../services/user-cache.service';
import { DriverService } from '../../../../core/services/drivers/driver.service';
import { OrderActionEvent } from '../order-action-select.component';
import { Driver } from '../../../../commons/model/driver/driver';
import { IUploadSettings } from '../../../../shared/components/upload-image.component';
import { DriverLocation } from '../../../../commons/model/driver/driver-location';
import { DriverStatusService } from '../../services/driver-status.service';
import { driverStatusColorsMap, vehicleTypeIconMap } from '../../model/driver-const';

@Component({
  selector: 'am-driver-details',
  styleUrls: ['../style'],
  template: require('./driver-details.component.html')
})
export class DriverDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('driverForm') form;

  private driverId: string;
  private driver: Driver = new Driver();
  private driverOriginal: Driver = new Driver();
  private driverLocation: DriverLocation;
  private wasModified: boolean = false;

  private uploadSettings: IUploadSettings = {
    url: '/driver/mgmt/v1/upload-image'
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private driverService: DriverService) {
  }

  ngOnInit() {
    const vm = this;
    vm.driverId = vm.route.parent.snapshot.params['driverId'];
    if (vm.driverId !== 'new') {
      vm.driverService.getProfile(parseInt(vm.driverId, 10)).subscribe(driver => {
        vm.driver = driver;
        vm.driverOriginal = _.cloneDeep(vm.driver);
      });
      vm.driverService.getLocation(parseInt(vm.driverId, 10)).subscribe(location => {
        vm.driverLocation = location;
      })
    }
  }

  ngAfterViewInit() {
    const vm = this;
    this.form.control.valueChanges
      .subscribe(values => {
        vm.wasModified = !_.isEqual(vm.driver, vm.driverOriginal);
      });
  }

  getStatus(): string {
    return String(DriverStatusService.getStatus(this.driverLocation)).replace('_', ' ');
  }

  getStatusColor(): string {
    return driverStatusColorsMap.get(DriverStatusService.getStatus(this.driverLocation));
  }

  getIcon() {
    return vehicleTypeIconMap.get(this.driver.capacity);
  }

  saveDriver() {
    const vm = this;
    vm.driverService.saveDriver(vm.driver, vm.driverOriginal).subscribe(
      driver => {
        vm.driver = driver;
        vm.driverOriginal = _.cloneDeep(driver);
        vm.wasModified = false;
        vm.driverId = String(driver.id);
        vm.router.navigate(['../../', driver.id, 'general'], {relativeTo: this.route});
      }
    );
  }
}

