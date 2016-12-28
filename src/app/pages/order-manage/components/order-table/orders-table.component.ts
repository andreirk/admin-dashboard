/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { OrderListService } from '../../services/order-list.service';
import { OrderList } from '../../model/order-list';
import { OrderFilterParams } from '../../model/order-filter-params';
import * as _ from 'lodash';
import { CommonOrderStatus, OrderStatus, DeliveryStatus } from '../../../../shared/types';
import { OrderFilterParamsForm } from '../../model/order-filter-params-form';
import { OrderFilteringService } from '../../services/order-filtering.service';

@Component({
  selector: 'am-order-list',
  styleUrls: ['../style'],
  template: require('./order-table.component.html')
})
export class OrdersTableComponent implements OnInit{
  @ViewChild('ordersFilterForm') form;

  private orders: OrderList = new OrderList();
  private pageSize = 10;

  private filterParamsForm: OrderFilterParamsForm = new OrderFilterParamsForm();

  private filterParams: OrderFilterParams = new OrderFilterParams();
  private filterParamsOriginal: OrderFilterParams = new OrderFilterParams();

  constructor(private orderListService: OrderListService,
      private orderFilteringService: OrderFilteringService) {
  }

  ngOnInit() {
    const vm = this;
    vm.loadMoreOrders();
  }

  ngAfterViewInit() {
    const vm = this;
    this.form.control.valueChanges
      .subscribe(values => {
        vm.filterParams = vm.orderFilteringService.transformFilterParams(vm.filterParamsForm);

        if (!_.isEqual(vm.filterParams, vm.filterParamsOriginal)) {
          vm.orders = new OrderList();
          vm.loadMoreOrders();
          vm.filterParamsOriginal = _.cloneDeep(vm.filterParams);
        }
      });
  }

  loadMoreOrders() {
    const vm = this;
    vm.orderListService.loadMore(vm.orders, vm.pageSize, vm.filterParams)
      .subscribe(orderList => {
        vm.orders = orderList;
      });
  }

  clearFilters() {
    this.filterParamsForm = new OrderFilterParamsForm();
  }

}

