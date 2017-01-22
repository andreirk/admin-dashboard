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

@Component({
  selector: 'am-driver-details',
  template: require('./driver-details.component.html')
})
export class DriverDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('driverForm') form;

  private driverId: string;
  private driver: Driver = new Driver();
  private driverOriginal: Driver = new Driver();
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
    vm.driverId = vm.route.snapshot.params['driverId'];
    if (vm.driverId !== 'new') {
      vm.driverService.getProfile(parseInt(vm.driverId, 10)).subscribe(driver => {
        vm.driver = driver;
        console.log(driver);
        vm.driverOriginal = _.cloneDeep(vm.driver);
      });
    }
  }

  ngAfterViewInit() {
    const vm = this;
    this.form.control.valueChanges
      .subscribe(values => {
        vm.wasModified = !_.isEqual(vm.driver, vm.driverOriginal);
      });
  }

  saveDriver() {
    const vm = this;
    vm.driverService.saveDriver(vm.driver, vm.driverOriginal).subscribe(
      driver => {
        vm.driver = driver;
        vm.driverOriginal = _.cloneDeep(driver);
        vm.wasModified = false;
        vm.driverId = String(driver.id);
        vm.router.navigate(['../', driver.id], {relativeTo: this.route});
      }
    );
  }
}

