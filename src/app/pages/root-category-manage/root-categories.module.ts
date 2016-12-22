/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { NgModule } from "@angular/core";
import { routing } from "./root-categories.routing";
import { RootCategoryService } from "./services/root-category.service";
import { RootCategoryListComponent } from "./components/root-category-list.component";
import { RootCategoryCardComponent } from "./components/root-category-card.component";
import { SharedModule } from "../../shared/shared.module";
import { RootCategoryDetailsComponent } from "./components/root-category-details/root-category-details.component";
import { BackendApiService } from "../../services/backend-api.service";
import { CategoryTypeOptionsDirective } from "./directives/category-type-options.directive";
import { SectionTypeOptionsDirective } from "./directives/section-type-options.directive";

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    RootCategoryListComponent,
    RootCategoryCardComponent,
    RootCategoryDetailsComponent
  ],
  providers: [
    BackendApiService,
    RootCategoryService
  ]
})
export default class RootCategoriesModule { }
