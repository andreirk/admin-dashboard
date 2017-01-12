import { NgModule } from '@angular/core';
import { ProductManageComponent } from './product-manage.component';
import { ProductListComponent } from './components/product/product-list.component';
import { ProductCardComponent } from './components/product/product-card.component';
import { Category } from './components/category/category';
import { routing } from './product-manage.routing';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    ProductManageComponent,
    ProductListComponent,
    ProductCardComponent
  ]
})
export default class ProductManageModule {}
