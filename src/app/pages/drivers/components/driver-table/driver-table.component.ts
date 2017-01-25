/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ViewList } from '../../../../commons/model/view-list';
import { DriverFilterParamsForm } from '../../model/driver-filter-params-form';
import { DriverFilterParams } from '../../model/driver-filter-params';
import { DriverFilteringService } from '../../services/driver-filtering.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverInfoListService } from '../../services/driver-info-list.service';
import { DriverInfo } from '../../../../commons/model/driver/driver-info';

@Component({
  selector: 'am-driver-table',
  styleUrls: ['../style'],
  template: require('./driver-table.component.html')
})
export class DriverTableComponent implements OnInit, AfterViewInit {
  @ViewChild('driversFilterForm') form;

  private drivers: ViewList<DriverInfo> = new ViewList<DriverInfo>();
  private pageSize = 10;
  private filterParamsForm: DriverFilterParamsForm = new DriverFilterParamsForm();
  private filterParams: DriverFilterParams = new DriverFilterParams();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private driverInfoListService: DriverInfoListService,
              private driverFilteringService: DriverFilteringService) {
  }

  ngOnInit() {
    const vm = this;
/* TODO: skipped until closing https://github.com/angular/angular/issues/13806
    vm.filterParams = <DriverFilterParams>vm.route.snapshot.queryParams;
    vm.filterParamsForm = vm.driverFilteringService.transformFilterParamsForm(vm.filterParams);
*/
    vm.loadMoreDrivers();
  }

  ngAfterViewInit() {
    const vm = this;
    vm.form.control.valueChanges.debounceTime(400)
      .subscribe(values => {
        vm.filterParams = vm.driverFilteringService.transformFilterParams(vm.filterParamsForm);
/* TODO: skipped until closing https://github.com/angular/angular/issues/13806
        let extras: NavigationExtras = <NavigationExtras> {
          preserveQueryParams: true,
          skipLocationChange: true,
          relativeTo: vm.route,
          queryParams: vm.filterParams };
        vm.router.navigate(['./'], extras);
*/
        vm.drivers = new ViewList<DriverInfo>();
        vm.loadMoreDrivers();
      });
  }

  loadMoreDrivers() {
    const vm = this;
    vm.driverInfoListService.loadMore(vm.drivers, vm.pageSize, '', vm.filterParams)
      .subscribe(driverList => {
        vm.drivers = driverList;
      });
  }

  clearStatus() {
    this.filterParamsForm.driverStatus = undefined;
  }

  clearFilters() {
    this.filterParamsForm = new DriverFilterParamsForm();
  }
}
