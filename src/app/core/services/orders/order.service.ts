import { Injectable } from '@angular/core';
import { BackendApiService } from '../backend-api.service';
import { Observable } from 'rxjs';
import { OrderFilterParams } from '../../../pages/order-manage/model/order-filter-params';
import { Order, OrderHistory } from '../../../commons/model/order';
import { Page } from '../../../commons/model/page';

@Injectable()
export class OrderService {
  private path: string = '/delivery/mgmt/v1/orders';

  constructor(private backendApi: BackendApiService) {
  }

  get(id: string): Observable<Order> {
    return this.backendApi.get(this.path + '/' + id, {});
  }

  getPage(page: number, size: number, filterParams: OrderFilterParams): Observable<Page<Order>> {
    return this.backendApi.get(this.path, Object.assign({
      'page': String(page),
      'size': String(size),
      'sort': 'creationDate,desc'
    }, filterParams));
  }

  getHistory(id: string): Observable<OrderHistory[]> {
    return this.backendApi.get(this.path + '/' + id + '/history', {});
  }

  completeOrder(id: string): Observable<Order> {
    return this.backendApi.put(this.path + '/' + id + '/complete', {}, {}, 'en');
  }

  toSupportOrder(id: string, reason: string): Observable<Order> {
    let sr = {
      reason: reason
    };
    return this.backendApi.put(this.path + '/' + id + '/to-support', sr, {}, 'en');
  }

  cancelOrder(id: string): Observable<Order> {
    return this.backendApi.put(this.path + '/' + id + '/cancel', {}, {}, 'en');
  }


}
