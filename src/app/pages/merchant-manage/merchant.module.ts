/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { NgModule } from "@angular/core";
import { MerchantListComponent } from "./components/merchant-list.component";
import { MerchantCardComponent } from "./components/merchant-card.component";
import { MerchantDetailsComponent } from "./components/merchant-details/merchant-details.component";
import { routing } from "./merchant.routing";
import { MerchantBackendService } from "./services/merchant-backend.service";
import { MerchantListService } from "./services/merchant-list.service";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    MerchantListComponent,
    MerchantCardComponent,
    MerchantDetailsComponent
  ],
  providers: [
    MerchantBackendService,
    MerchantListService
  ]
})
export default class MerchantsModule { }
