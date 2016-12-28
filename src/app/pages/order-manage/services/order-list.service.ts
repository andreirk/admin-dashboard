/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { OrderService } from '../../../core/services/orders/order.service';
import { OrderList } from '../model/order-list';
import { Observable } from 'rxjs';
import { OrderFilterParams } from '../model/order-filter-params';

@Injectable()
export class OrderListService {
  constructor(private orderService: OrderService) { }

  update(orderList: OrderList, page: number, size: number, filterParams: OrderFilterParams): Observable<OrderList> {
    return this.orderService.getPage(page, size, filterParams)
      .map(orderPage => {
          orderList.total = orderPage.total;
          for (let i = 0; i < orderPage.content.length; ++i) {
            orderList.content[i + page * size] = orderPage.content[i];
          }
          return orderList;
        }
      );
  }

  loadMore(orderList: OrderList, size: number, filterParams: OrderFilterParams): Observable<OrderList> {
    const vm = this;
    let page =  orderList.content.length / size;
    return vm.update(orderList, page, size, filterParams);
  }

  deleteOne(orderList: OrderList, orderId: string): OrderList {
    let oldLength = orderList.content.length;
    orderList.content = orderList.content.filter(order => order.id !== orderId);
    orderList.total -= oldLength - orderList.content.length;
    return orderList;
  }

}
