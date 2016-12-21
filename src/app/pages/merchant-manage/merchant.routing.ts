/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Routes, RouterModule } from '@angular/router';
import { MerchantListComponent } from './components/merchant-list.component';
import { MerchantDetailsComponent } from './components/merchant-details/merchant-details.component';

const routes: Routes = [
  {
    path: '',
    component: MerchantListComponent
  },
  {
    path: ':merchantId',
    component: MerchantDetailsComponent
  }
];

export const routing = RouterModule.forChild(routes);
