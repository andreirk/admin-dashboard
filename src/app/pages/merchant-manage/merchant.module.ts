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
import { PosCardComponent } from "./components/pos/pos-card.component";
import { PosListComponent } from "./components/pos/pos-list.component";
import { PosDetailsComponent } from "./components/pos/pos-details/pos-details.component";
import { MerchantSectionsComponent } from "./components/merchant-sections.component";
import { ProductListComponent, ProductCardComponent } from "./components/products/product-list.component";
import { ProductFormComponent } from "./components/products/product-form.component";
import { ModalComponent } from "../../shared/components/modal.component";
import { TabsModule, AccordionModule, ButtonsModule } from 'ng2-bootstrap';
import { SelectModule } from 'ng2-select';
import { CategorySelectComponent } from "./components/products/category-select-component";
import { GroupMultiSelectComponent } from "./components/products/group-multiselect-component";
import { TagMultiSelectComponent } from "./components/products/tag-multiselect-component";
import { StoreModule, combineReducers } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import reducer from './components/products/reducers'
import { ProductActions } from "./components/products/actions";
import { ProductEffects } from "./components/products/effects";
import { ProductDetailsContainerComponent } from "./components/products/product-details-container";
import { PosWorkTimesComponent } from "./components/pos/pos-work-times/pos-work-times.component";
import { AgmCoreModule } from "angular2-google-maps/core";

@NgModule({
  imports: [
    SharedModule,
    MultiselectDropdownModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC52zimpd1o93V2W4_hDENNdFkI4nJrGo8'
    }),
    TabsModule,
    AccordionModule,
    ButtonsModule,
    SelectModule,
    routing,

    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(ProductEffects),
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
    MerchantSectionsComponent,
  ],
  providers: [
    MerchantViewModelService,
    ProductActions,
  ]
})
export default class MerchantsModule { }
