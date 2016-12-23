/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendApiService } from './services/backend-api.service';
import { MerchantBackendService } from './services/merchants/merchant-backend.service';
import { MerchantListService } from './services/merchants/merchant-list.service';
import { RootCategoryService } from './services/root-categories/root-category.service';
import { CategoryService } from './services/categories/category.service';
import { ProductService } from './services/products/products-service';

@NgModule({
  imports: [CommonModule],
  providers: [BackendApiService,
    MerchantBackendService,
    MerchantListService,
    RootCategoryService,
    CategoryService,
    ProductService
  ]
})
export class CoreModule {
}
