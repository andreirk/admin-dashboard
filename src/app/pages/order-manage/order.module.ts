/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { routing } from './order.routing';
import { OrdersTableComponent } from './components/orders-table.component';
import { OrderRowComponent } from './components/order-row.component';
import { UserCacheService } from './services/user-cache.service';
import { DriverCacheService } from './services/driver-cache.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { PeerDetailsComponent } from './components/peer-details.component';
import { UserPeerDetailsComponent } from './components/user-peer-details.component';
import { PosPeerDetailsComponent } from './components/pos-peer-details.component';
import { OrderItemsTableComponent } from './components/order-items-table.component';
import { OrderHistoryTableComponent } from './components/order-history-table.component';

@NgModule({
  imports: [
    SharedModule,
    NgbModule,
    routing
  ],
  declarations: [
    OrdersTableComponent,
    OrderRowComponent,
    OrderDetailsComponent,
    UserPeerDetailsComponent,
    PosPeerDetailsComponent,
    OrderItemsTableComponent,
    OrderHistoryTableComponent
  ],
  providers: [
    UserCacheService,
    DriverCacheService
  ]
})
export default class MerchantsModule { }
