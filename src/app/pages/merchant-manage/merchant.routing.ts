/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Routes, RouterModule } from '@angular/router';
import { MerchantListComponent } from './components/merchant-list.component';
import { MerchantDetailsComponent } from './components/merchant-details/merchant-details.component';
import {PosListComponent} from "./components/pos/pos-list.component";
import {PosDetailsComponent} from "./components/pos/pos-details/pos-details.component";
import {MerchantSectionsComponent} from "./components/merchant-sections.component";
import ProductSectionModule from "../product-section/product-section.module";

const routes: Routes = [
  {
    path: '',
    component: MerchantListComponent
  },
  {
    path: ':merchantId',
    component: MerchantSectionsComponent,
    children: [
      {
        path: 'general',
        component: MerchantDetailsComponent,
      },
      {
        path: 'pos',
        component: PosListComponent,
      },
      {
        path: 'pos/:posId',
        component: PosDetailsComponent,
      },
      {
        path: 'products',
        component: ProductSectionModule,
      },
    ]
  },

];

export const routing = RouterModule.forChild(routes);
