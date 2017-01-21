import { NgModule }      from '@angular/core';

import { routing } from './product-section.routing';
import { SharedModule } from '../../shared/shared.module';
import { ProductListComponent } from "../merchant-manage/components/products/product-list.component";
import { ProductFormComponent } from "../merchant-manage/components/products/product-form.component";
import { ProductSectionComponent } from "./product-section.component";


@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    ProductSectionComponent,
    ProductListComponent,
    ProductFormComponent
  ]
})
export default class ProductSectionModule {}
