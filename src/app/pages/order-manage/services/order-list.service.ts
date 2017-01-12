/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { OrderService } from '../../../core/services/orders/order.service';
import { Observable } from 'rxjs';
import { ViewListService } from '../../../core/services/view-list.service';
import { Order } from '../../../commons/model/order';
import { Page } from '../../../commons/model/page';

@Injectable()
export class OrderListService extends ViewListService<Order>{
  constructor(private orderService: OrderService) {
    super();
  }

  getPage(page: number, size: number, lang: string, filterParams?: any): Observable<Page<Order>> {
    return this.orderService.getPage(page, size, filterParams);
  }
}
