/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, Input } from '@angular/core';
import { Order, OrderLine, OrderItemOptionsValue } from '../../../commons/model/order';

@Component({
  selector: 'am-order-items-table',
  styleUrls: ['./style'],
  template: `
<table class="table table-striped table-condensed">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Description</th>
      <th>QTY</th>
      <th>Price SAR</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let row of table;">
      <td *ngIf="row.type == 'item'">{{row.value.productId | amSuffix:4}}</td>
      <td *ngIf="row.type == 'item'">{{row.value.name}}</td>
      <td *ngIf="row.type == 'item'">{{row.value.note}}</td>
      <td *ngIf="row.type == 'item'">{{row.value.quantity}}</td>
      <td *ngIf="row.type == 'item'">{{row.value.price}}</td>
      
      <td *ngIf="row.type == 'option'"></td>
      <td *ngIf="row.type == 'option'">{{row.value.optionName + ' ' + row.value.optionValueName}}</td>
      <td *ngIf="row.type == 'option'"></td>
      <td *ngIf="row.type == 'option'"></td>
      <td *ngIf="row.type == 'option'">{{row.value.optionValuePrice}}</td>
    </tr>
  </tbody>
</table>
  `
})
export class OrderItemsTableComponent implements OnInit {
  @Input() order: Order = new Order();
  private table: OrderItemRow[] = [];

  ngOnInit() {

  }

  ngOnChanges() {
    this.fillTable();
  }

  fillTable() {
    const vm = this;
    vm.table = [];
    vm.order.orderLines.forEach(orderLine => {
      vm.table.push(<OrderItemRow> {
        type: 'item',
        value: orderLine
      });
      if (orderLine.productOptionsValues) {
        orderLine.productOptionsValues.forEach(option => {
          vm.table.push(<OrderItemRow> {
            type: 'option',
            value: option
          });
        });
      }
    });
  }
}

class OrderItemRow {
  public type: string;
  public value: OrderLine | OrderItemOptionsValue;

  constructor() {
  }
}
