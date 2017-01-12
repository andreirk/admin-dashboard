import { NgModule }      from '@angular/core';

import { routing } from './product-section.routing';
import { SharedModule } from '../../shared/shared.module';
import { ProductListComponent } from "./components/product-list.component";
import { ProductDetailComponent } from "./components/product-details.component";
import { ProductSectionComponent } from "./product-section.component";


@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    ProductSectionComponent,
    ProductListComponent,
    ProductDetailComponent
  ]
})
export default class ProductSectionModule {}
