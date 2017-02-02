/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendApiService } from './services/backend-api.service';
import { MerchantBackendService } from './services/merchants/merchant-backend.service';
import { RootCategoryService } from './services/root-categories/root-category.service';
import { CategoryService } from './services/categories/category.service';
import { ProductService } from './services/products/products-service';
import { OrderService } from './services/orders/order.service';
import { UserService } from './services/users/user.service';
import { DriverService } from './services/drivers/driver.service';
import { PosService } from './services/pos/pos.service';
import { GroupService } from './services/groups/group.service';
import { GroupListService } from './services/groups/group-list.service';
import { WorkTimeService } from './services/work-times/work-time.service';
import { CanDeactivateGuard } from './services/guards/can-deactivate-guard.service';
import { GoogleGeocodingService } from './services/geocoding/google-geocoding.service';
import { TagService } from './services/tags/tag.service';

@NgModule({
  imports: [CommonModule],
  providers: [BackendApiService,
    MerchantBackendService,
    RootCategoryService,
    CategoryService,
    ProductService,
    OrderService,
    UserService,
    DriverService,
    PosService,
    GroupService,
    GroupListService,
    WorkTimeService,
    CanDeactivateGuard,
    GoogleGeocodingService,
    TagService,
  ]
})
export class CoreModule {
}
