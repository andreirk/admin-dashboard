/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { UserCacheService } from '../../services/user-cache.service';
import { OrderActionEvent } from '../order-action-select.component';
import { IUploadSettings } from '../../../../shared/components/upload-image.component';
import { DriverViewModelService } from '../../services/driver-view-model.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'am-driver-details',
  styleUrls: ['../style'],
  template: require('./driver-details.component.html')
})
export class DriverDetailsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('driverForm') form: NgForm;

  private uploadSettings: IUploadSettings = {
    url: '/driver/mgmt/v1/upload-image'
  };

  constructor(private vmService: DriverViewModelService) {
  }

  ngAfterViewInit() {
    const vm = this;
    vm.vmService.registerForm('general', vm.form);
  }

  ngOnDestroy() {
    this.vmService.unregisterForm('general');
  }
}

