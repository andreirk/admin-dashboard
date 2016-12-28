/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../../commons/model/order';
import { OrderStatus, CommonOrderStatus } from '../types';
@Pipe({
  name: 'amOrderStatus'
})
export class OrderStatusPipe implements PipeTransform {
  transform(order: Order): CommonOrderStatus {
    if (!order) {
      return;
    }
    return (order.status === OrderStatus.ACCEPTED && !order.deliveryStatus) ? order.deliveryStatus : order.status;
  }

}
