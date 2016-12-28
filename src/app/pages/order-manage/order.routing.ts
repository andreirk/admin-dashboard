/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Routes, RouterModule } from '@angular/router';
import { OrdersTableComponent } from './components/order-table/orders-table.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersTableComponent
  },
  {
    path: ':orderId',
    component: OrderDetailsComponent
  }
];

export const routing = RouterModule.forChild(routes);
