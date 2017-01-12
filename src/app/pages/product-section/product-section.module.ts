import { NgModule }      from '@angular/core';

import { routing } from './product-section.routing';
import { SharedModule } from '../../shared/shared.module';
import { ProductListComponent } from "./components/product-list.component";
import { ProductDetailComponent } from "./components/product-details.component";


@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [

    ProductListComponent,
    ProductDetailComponent

  ]
})
export default class ProductSectionModule {}
