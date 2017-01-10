/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { NgModule } from "@angular/core";
import { MerchantListComponent } from "./components/merchant-list.component";
import { MerchantCardComponent } from "./components/merchant-card.component";
import { MerchantDetailsComponent } from "./components/merchant-details/merchant-details.component";
import { routing } from "./merchant.routing";
import { SharedModule } from "../../shared/shared.module";
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { RootCategoryMultiselectComponent } from './components/root-category-mutliselect.component';
import { MerchantViewModelService } from './services/merchant-view-model.service';
import {PosCardComponent} from "./components/pos/pos-card.component";
import {PosListComponent} from "./components/pos/pos-list.component";
import {PosDetailsComponent} from "./components/pos/pos-details/pos-details.component";
import {MerchantSectionsComponent} from "./components/merchant-sections.component";

@NgModule({
  imports: [
    SharedModule,
    MultiselectDropdownModule,
    routing
  ],
  declarations: [
    MerchantListComponent,
    MerchantCardComponent,
    MerchantDetailsComponent,
    RootCategoryMultiselectComponent,
    PosListComponent,
    PosCardComponent,
    PosDetailsComponent,
    MerchantSectionsComponent,
  ],
  providers: [
    MerchantViewModelService
  ]
})
export default class MerchantsModule { }
