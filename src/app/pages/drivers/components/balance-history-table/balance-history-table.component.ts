/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverBalanceRecord } from '../../../../commons/model/driver/driver-balance-record';
import { ViewList } from '../../../../commons/model/view-list';
import { BalanceRecordListService } from '../../services/balance-record-list.service';
import { BalanceRecordFilterParams } from '../../model/balance-record-filter-params';
import { BalanceRecordFilterParamsForm } from '../../model/balance-record-filter-params-form';
import { BalanceRecordFilteringService } from '../../services/balance-record-filtering.service';
@Component({
  selector: 'am-driver-balance-table',
  styleUrls: ['../style'],
  template: require('./balance-history-table.component.html')
})
export class DriverBalanceHistoryTableComponent implements OnInit, AfterViewInit {
  @ViewChild('balanceRecordsFilterForm') form;

  private driverId: string;
  private balanceRecords: ViewList<DriverBalanceRecord> = new ViewList<DriverBalanceRecord>();
  private pageSize: number = 10;
  private filterParams: BalanceRecordFilterParams = new BalanceRecordFilterParams();
  private filterParamsForm: BalanceRecordFilterParamsForm = new BalanceRecordFilterParamsForm();

  constructor (private route: ActivatedRoute,
               private router: Router,
               private balanceRecordListService: BalanceRecordListService,
               private balanceRecordFilteringService: BalanceRecordFilteringService) {
  }

  ngOnInit() {
    const vm = this;
    vm.driverId = vm.route.parent.snapshot.params['driverId'];
    vm.filterParams.driverId = parseInt(vm.driverId, 10);

    vm.loadMoreBalanceRecords();
  }

  ngAfterViewInit() {
    const vm = this;
    this.form.control.valueChanges.debounceTime(400)
      .subscribe(values => {
        vm.filterParams = vm.balanceRecordFilteringService.transformFilterParams(vm.filterParamsForm, parseInt(vm.driverId, 10));
        vm.balanceRecords = new ViewList<DriverBalanceRecord>();
        vm.loadMoreBalanceRecords();
      });
  }

  loadMoreBalanceRecords() {
    const vm = this;
    vm.balanceRecordListService.loadMore(vm.balanceRecords, vm.pageSize, '', vm.filterParams)
      .subscribe(balanceRecordList => {
        vm.balanceRecords = balanceRecordList;
      });
  }

  clearFilters() {
    this.filterParamsForm = new BalanceRecordFilterParamsForm();
  }
}
