/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../core/services/orders/order.service';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { OrderListService } from '../../../core/services/orders/order-list.service';
import { OrderList } from '../../../commons/model/order-list';
import { OrderFilterParams } from '../../../commons/model/order-filter-params';

@Component({
  selector: 'am-order-list',
  styleUrls: ['./style'],
  template: `
<div>
  <form #ordersFilterForm="ngForm" class="form-inline">
    <p>Filter by:</p>
    <div class="form-group col-sm-2">
      <label>Created from:</label>
      <div class='input-group date'>
        <input class="form-control" placeholder="yyyy-mm-dd" name="dpfrom" [(ngModel)]="createdFrom" ngbDatepicker #dfrom="ngbDatepicker">
        <div class="input-group-addon" (click)="dfrom.toggle()" >
          <span class="glyphicon glyphicon-calendar"></span>      
        </div>
      </div>
    </div>
    
    <div class="form-group col-sm-2">
      <label>to:</label>
      <div class='input-group date'>
        <input class="form-control" placeholder="yyyy-mm-dd" name="dpto" [(ngModel)]="createdTo" ngbDatepicker #dto="ngbDatepicker">
        <div class="input-group-addon" (click)="dto.toggle()" >
          <span class="glyphicon glyphicon-calendar"></span>      
        </div>
      </div>
    </div>
  </form>  

  <div class="table-responsive">
    <table class="table table-striped table-condensed table-hover order-list">
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Status</th>
          <th>Created</th>
          <th>Delivered</th>
          <th>Customer</th>
          <th>Driver</th>
          <th>Pick-up</th>
          <th>Drop-off</th>
          <th>Total SAR</th>
        </tr>
      </thead>
      <tbody>
        <tr am-order-row *ngFor="let order of orders.content;" [order]="order"></tr>
      </tbody>
    </table>
  </div>
  <div class="col-sm-3">
    <button (click)="loadMoreOrders()" class="btn btn-secondary" 
      [hidden]="orders.content.length == orders.total">Show more</button>
  </div>
 </div>`
})
export class OrdersTableComponent implements OnInit{
  @ViewChild('ordersFilterForm') form;

  private orders: OrderList = new OrderList();
  private pageSize = 10;

  private createdFrom: NgbDateStruct;
  private createdTo: NgbDateStruct;

  private filterParams: OrderFilterParams = new OrderFilterParams();

  constructor(private orderService: OrderService,
              private orderListService: OrderListService) {
  }

  ngOnInit() {
    const vm = this;
    vm.loadMoreOrders();
  }

  ngAfterViewInit() {
    const vm = this;
    this.form.control.valueChanges
      .subscribe(values => {
        vm.filterParams = {};
        vm.filterParams.fromDate = vm.createdFrom ? new Date(vm.createdFrom.year, vm.createdFrom.month - 1, vm.createdFrom.day).getTime() / 1000 : undefined;
        vm.filterParams.toDate = vm.createdTo ? new Date(vm.createdTo.year, vm.createdTo.month - 1, vm.createdTo.day).getTime() / 1000 : undefined;
        vm.orders = new OrderList();
        vm.loadMoreOrders();
      });
  }

  loadMoreOrders() {
    const vm = this;
    vm.orderListService.loadMore(vm.orders, vm.pageSize, vm.filterParams)
      .subscribe(orderList => {
        vm.orders = orderList;
      });
  }

}

