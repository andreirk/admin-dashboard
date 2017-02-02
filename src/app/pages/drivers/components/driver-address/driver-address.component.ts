/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { DriverViewModelService } from '../../services/driver-view-model.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'am-driver-address',
  template: require('./driver-address.component.html')
})
export class DriverAddressComponent implements AfterViewInit, OnDestroy {
  @ViewChild('driverAddressForm') form: NgForm;

  constructor(private vmService: DriverViewModelService) {
  }

  ngAfterViewInit() {
    const vm = this;
    vm.vmService.registerForm('address', vm.form);
  }

  ngOnDestroy() {
    this.vmService.unregisterForm('address');
  }
}

