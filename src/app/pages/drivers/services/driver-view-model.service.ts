/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { Driver } from '../../../commons/model/driver/driver';
import { DriverService } from '../../../core/services/drivers/driver.service';
import { DriverLocation } from '../../../commons/model/driver/driver-location';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable()
export class DriverViewModelService {
  constructor(private driverService: DriverService) {
  }

  public driverId: number;
  public driver: Driver = new Driver();
  public driverOriginal: Driver = new Driver();
  public driverLocation: DriverLocation;
  public wasModified: boolean = false;

  public isValid: boolean = true;
  public formValidMap: Map<string, boolean> = new Map();

  private currentTab: string;
  private currentForm: NgForm;
  private formSubscription: Subscription;

  updateDriver(driverId: number) {
    const vm = this;
    vm.driverService.getProfile(driverId).subscribe(driver => {
      vm.driverId = driverId;
      vm.driver = driver;
      vm.driverOriginal = _.cloneDeep(vm.driver);
    });

    vm.driverService.getLocation(driverId).subscribe(location => {
      vm.driverLocation = location;
    })
  }

  saveDriver(): Observable<number> {
    const vm = this;
    return vm.driverService.saveDriver(vm.driver, vm.driverOriginal).map(
      driver => {
        vm.driver = driver;
        vm.driverOriginal = _.cloneDeep(driver);
        vm.wasModified = false;
        vm.driverId = driver.id;
        return vm.driverId;
      }
    );
  }

  // calls when tab opens
  registerForm(tabName: string, form: NgForm) {
    const vm = this;
    vm.currentTab = tabName;
    vm.currentForm = form;
    if (vm.formSubscription) {
      vm.formSubscription.unsubscribe();
    }

    vm.formSubscription = vm.currentForm.form.valueChanges.debounceTime(300).subscribe(() => {
      vm.wasModified = !_.isEqual(vm.driver, vm.driverOriginal);
      vm.updateValid();
    });
  }

  unregisterForm(tabName: string) {
    const vm = this;
    vm.currentTab = null;
    if (vm.formSubscription) {
      vm.formSubscription.unsubscribe();
    }
  }

  updateValid() {
    const vm = this;
    vm.formValidMap.set(vm.currentTab, vm.currentForm.form.valid);

    let valid: boolean = true;
    vm.formValidMap.forEach(v => {
      valid = valid && v;
    });
    vm.isValid = valid;
  }

  getValidationMessage() {
    const vm = this;
    let message: string = 'Validation failed for tab ';
    vm.formValidMap.forEach((val, tab) => {
      if (!val) {
        message = message + tab.toLowerCase() + ', ';
      }
    });

    return message.substr(0, message.length - 2);
  }



}

