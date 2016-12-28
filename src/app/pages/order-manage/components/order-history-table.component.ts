/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, OnInit } from '@angular/core';
import { OrderHistory } from '../../../commons/model/order';
import { OrderService } from '../../../core/services/orders/order.service';

@Component({
  selector: 'am-order-history-table',
  styleUrls: ['./style'],
  template: `
<table class="table table-striped table-condensed">
  <thead>
    <tr>
      <th>Type</th>
      <th>Date</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let row of history;">
      <td>{{row.type}}</td>
      <td>{{row.date*1000 | date:'short'}}</td>
      <td>{{row.reason}}</td>
    </tr>
  </tbody>
</table>
  `
})
export class OrderHistoryTableComponent implements OnInit {
  @Input() orderId: string;
  private history: OrderHistory[] = [];

  constructor(private orderService: OrderService) {

  }

  ngOnInit() {
    if (this.orderId) {
      this.loadHistory(this.orderId);
    }
  }

  ngOnChanges() {
    if (this.orderId) {
      this.loadHistory(this.orderId);
    }
  }

  private loadHistory(orderId: string) {
    const vm = this;
    vm.orderService.getHistory(orderId)
      .subscribe(history => { vm.history = history; })
  }
}
