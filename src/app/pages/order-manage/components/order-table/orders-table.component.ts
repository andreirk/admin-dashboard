/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OrderListService } from '../../services/order-list.service';
import { OrderFilterParams } from '../../model/order-filter-params';
import * as _ from 'lodash';
import { OrderFilterParamsForm } from '../../model/order-filter-params-form';
import { OrderFilteringService } from '../../services/order-filtering.service';
import { ViewList } from '../../../../commons/model/view-list';
import { Order } from '../../../../commons/model/order';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'am-order-list',
  styleUrls: ['../style'],
  template: require('./order-table.component.html')
})
export class OrdersTableComponent implements OnInit, AfterViewInit {
  @ViewChild('ordersFilterForm') form;

  private orders: ViewList<Order> = new ViewList<Order>();
  private pageSize = 10;

  private filterParamsForm: OrderFilterParamsForm = new OrderFilterParamsForm();

  private filterParams: OrderFilterParams = new OrderFilterParams();
  private filterParamsOriginal: OrderFilterParams = new OrderFilterParams();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderListService: OrderListService,
              private orderFilteringService: OrderFilteringService) {
  }

  ngOnInit() {
    const vm = this;

    if (vm.route.snapshot.queryParams['driverId']) {
      vm.filterParams.driverId = vm.route.snapshot.queryParams['driverId'];
      vm.filterParamsForm = vm.orderFilteringService.transformFilterParamsForm(vm.filterParams);
    }
    vm.loadMoreOrders();
  }

  ngAfterViewInit() {
    const vm = this;
    vm.form.control.valueChanges
      .subscribe(values => {
        vm.filterParams = vm.orderFilteringService.transformFilterParams(vm.filterParamsForm);

        if (!_.isEqual(vm.filterParams, vm.filterParamsOriginal)) {
          vm.orders = new ViewList<Order>();
          vm.loadMoreOrders();
          vm.filterParamsOriginal = _.cloneDeep(vm.filterParams);
        }
      });
  }

  loadMoreOrders() {
    const vm = this;
    vm.orderListService.loadMore(vm.orders, vm.pageSize, '', vm.filterParams)
      .subscribe(orderList => {
        vm.orders = orderList;
      });
  }

  clearFilters() {
    this.filterParamsForm = new OrderFilterParamsForm();
  }

}

