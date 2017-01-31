/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DriverViewModelService } from '../../services/driver-view-model.service';

@Component({
  selector: 'am-car-details',
  styleUrls: ['../style'],
  template: require('./car-details.component.html')
})
export class CarDetailsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('carDetailsForm') form: NgForm;

  constructor(private vmService: DriverViewModelService) {
  }

  ngAfterViewInit() {
    const vm = this;
    vm.vmService.registerForm('car', vm.form);
  }

  ngOnDestroy() {
    this.vmService.unregisterForm('car');
  }
}
