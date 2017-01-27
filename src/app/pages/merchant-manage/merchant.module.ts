/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { NgModule } from '@angular/core';
import { MerchantListComponent } from './components/mrechant-list/merchant-list.component';
import { MerchantCardComponent } from './components/merchant-card.component';
import { MerchantDetailsComponent } from './components/merchant-details/merchant-details.component';
import { routing } from './merchant.routing';
import { SharedModule } from '../../shared/shared.module';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { RootCategoryMultiselectComponent } from './components/root-category-mutliselect.component';
import { MerchantViewModelService } from './services/merchant-view-model.service';
import { PosCardComponent } from './components/pos/pos-card.component';
import { PosListComponent } from './components/pos/pos-list.component';
import { PosDetailsComponent } from './components/pos/pos-details/pos-details.component';
import { MerchantSectionsComponent } from './components/merchant-sections.component';
import { PosWorkTimesComponent } from './components/pos/pos-work-times/pos-work-times.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { WorkTimeViewModelService } from './services/work-time-view-model.service';
import { MerchantListService } from './services/merchant-list.service';
import { MerchantFilteringService } from './services/merchant-filtering.service';

@NgModule({
  imports: [
    SharedModule,
    MultiselectDropdownModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC52zimpd1o93V2W4_hDENNdFkI4nJrGo8'
    }),
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
    PosWorkTimesComponent,
    MerchantSectionsComponent
  ],
  providers: [
    MerchantViewModelService,
    WorkTimeViewModelService,
    MerchantListService,
    MerchantFilteringService
  ]
})
export default class MerchantsModule {
}
