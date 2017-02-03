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
import { PosViewModelService } from './services/pos-view-model.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangeGeoPointCardComponent } from './components/pos/change-geo-point-card.component';
import { PosMapComponent } from './components/pos/pos-map.component';
import { PosDetailsInputFormComponent } from './components/pos/pos-details/pos-details-input-form.component';
import { ProductListContainerComponent } from './components/products/product-list-container.component';
import { ProductFormComponent } from './components/products/product-form.component';
import { TabsModule, AccordionModule, ButtonsModule } from 'ng2-bootstrap';
import { GroupMultiSelectComponent } from './components/products/components/group-multiselect-component';
import { TagMultiSelectComponent } from './components/products/components/tag-multiselect-component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import productReducer from './store';
import { ProductActions } from './components/products/actions';
import { ProductEffects } from './components/products/effects';
import { ProductDetailsContainerComponent } from './components/products/product-details-container';
import { RouterStoreModule } from '@ngrx/router-store';
import { ProductCardComponent } from './components/products/product-card.component';
import { ProductListDisplayComponent } from './components/products/product-list-desplay.component';
import { CategorySelectComponent } from './components/products/components/category-select-component';
import { ProductMediaResourceComponent } from './components/products/media-resources.component';
import { ProductOptionListContainerComponent } from './components/product-options/components/product-options-list-contaiter.component';
import { ProductOpitonListDisplayComponent } from './components/product-options/components/product-option-list-display.component';
import { ProductOptionCardComponent } from './components/product-options/components/product-option-card.component/product-option-card.component';
import { ProductOptionDetailsContainerComponent } from './components/product-options/components/product-option-details-container.component';
import { ProductOptionFormComponent } from './components/product-options/components/product-option-form.component/product-option-form.component';
import { ProductOptionValuesComponent } from './components/product-options/components/product-option-values-component/product-option-values.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProductOptionActions } from './components/product-options/actions/product-option.actions';
import { ProductOptionsEffects } from './components/product-options/effects/productOptions.effects';
// TODO: replace with original ng2-select when support for bootstapV4-alfa6 is available
import { SelectModule } from '../../shared/components/ng2-custom-select/ng2-select';
import { MerchantActions } from './actions/merchant-actions';
import { NgPipesModule } from 'ngx-pipes';


@NgModule({
  imports: [
    SharedModule,
    MultiselectDropdownModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC52zimpd1o93V2W4_hDENNdFkI4nJrGo8'
    }),
    routing,
    Ng2SmartTableModule,
    TabsModule,
    AccordionModule,
    ButtonsModule,
    SelectModule,
    routing,
    // TODO: move this pipies module to shared
    NgPipesModule,

    StoreModule.provideStore(productReducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(ProductEffects),
    EffectsModule.run(ProductOptionsEffects),
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
    ChangeGeoPointCardComponent,
    PosMapComponent,
    PosDetailsInputFormComponent,
    MerchantSectionsComponent,
    PosWorkTimesComponent,
    MerchantSectionsComponent,
    ProductListContainerComponent,
    ProductListDisplayComponent,
    ProductDetailsContainerComponent,
    ProductCardComponent,
    ProductFormComponent,
    CategorySelectComponent,
    GroupMultiSelectComponent,
    TagMultiSelectComponent,
    ProductMediaResourceComponent,
    ProductOptionListContainerComponent,
    ProductOpitonListDisplayComponent,
    ProductOptionCardComponent,
    ProductOptionDetailsContainerComponent,
    ProductOptionFormComponent,
    ProductOptionValuesComponent,


  ],
  providers: [
    MerchantViewModelService,
    WorkTimeViewModelService,
    MerchantListService,
    MerchantFilteringService,
    PosViewModelService,
    MerchantActions,
    ProductActions,
    ProductOptionActions,
  ]
})
export default class MerchantsModule {
}
