/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Routes, RouterModule } from '@angular/router';
import { MerchantListComponent } from './components/mrechant-list/merchant-list.component';
import { MerchantDetailsComponent } from './components/merchant-details/merchant-details.component';
import {PosListComponent} from "./components/pos/pos-list.component";
import {PosDetailsComponent} from "./components/pos/pos-details/pos-details.component";
import {MerchantSectionsComponent} from "./components/merchant-sections.component";
import { CanDeactivateGuard } from "../../core/services/guards/can-deactivate-guard.service";

import { PosListComponent } from './components/pos/pos-list.component';
import { PosDetailsComponent } from './components/pos/pos-details/pos-details.component';
import { MerchantSectionsComponent } from './components/merchant-sections.component';
import { CanDeactivateGuard } from '../../core/services/guards/can-deactivate-guard.service';
import { ProductListContainerComponent } from './components/products/product-list-container.component';
import { ProductDetailsContainerComponent } from './components/products/product-details-container';
import { ProductOptionListContainerComponent } from './components/product-options/components/product-options-list-contaiter.component';
import { ProductOptionDetailsContainerComponent } from './components/product-options/components/product-option-details-container.component';

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
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'products',
        component: ProductListContainerComponent,
      },
      {
        path: 'products/:productId',
        component: ProductDetailsContainerComponent,
      },
      {
        path: 'product-options',
        component: ProductOptionListContainerComponent,
      },
      {
        path: 'product-options/:productOptionId',
        component: ProductOptionDetailsContainerComponent,
      },
    ]
  },

];

export const routing = RouterModule.forChild(routes);
