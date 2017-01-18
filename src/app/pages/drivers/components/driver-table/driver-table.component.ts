/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { DriverListService } from '../../services/driver-list.service';
import { ViewList } from '../../../../commons/model/view-list';
import { DriverProfile } from '../../../../commons/model/driver-profile';
import { DriverFilterParamsForm } from '../../model/driver-filter-params-form';
import { DriverFilterParams } from '../../model/driver-filter-params';
import { DriverFilteringService } from '../../services/driver-filtering.service';

@Component({
  selector: 'am-driver-table',
  styleUrls: ['../style'],
  template: require('./driver-table.component.html')
})
export class DriverTableComponent implements OnInit {
  @ViewChild('driversFilterForm') form;

  private drivers: ViewList<DriverProfile> = new ViewList<DriverProfile>();
  private pageSize = 10;
  private filterParamsForm: DriverFilterParamsForm = new DriverFilterParamsForm();
  private filterParams: DriverFilterParams = new DriverFilterParams();

  constructor(private driverListService: DriverListService,
              private driverFilteringService: DriverFilteringService) {
  }

  ngOnInit() {
    const vm = this;
    vm.loadMoreDrivers();
  }

  ngAfterViewInit() {
    const vm = this;
    this.form.control.valueChanges.debounceTime(400)
      .subscribe(values => {
        vm.filterParams = vm.driverFilteringService.transformFilterParams(vm.filterParamsForm);
        vm.drivers = new ViewList<DriverProfile>();
        vm.loadMoreDrivers();
      });
  }

  loadMoreDrivers() {
    const vm = this;
    vm.driverListService.loadMore(vm.drivers, vm.pageSize, '', vm.filterParams)
      .subscribe(driverList => {
        vm.drivers = driverList;
      });
  }

}
