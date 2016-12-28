import { Injectable } from '@angular/core';
import { BackendApiService } from '../backend-api.service';
import { Observable } from 'rxjs';
import { OrderPage } from '../../../commons/model/order-page';
import { OrderFilterParams } from '../../../pages/order-manage/model/order-filter-params';
import { Order, OrderHistory } from '../../../commons/model/order';

@Injectable()
export class OrderService {
  private path: string = '/delivery/mgmt/v1/orders';

  constructor(private backendApi: BackendApiService) {
  }

  get(id: string): Observable<Order> {
    return this.backendApi.get(this.path + '/' + id, {});
  }

  getPage(page: number, size: number, filterParams: OrderFilterParams): Observable<OrderPage> {
    return this.backendApi.get(this.path, Object.assign({
      'page': String(page),
      'size': String(size),
    }, filterParams));
  }

  getHistory(id: string): Observable<OrderHistory[]> {
    return this.backendApi.get(this.path + '/' + id + '/history', {});
  }
}
