import { NgModule } from '@angular/core';
import { ProductManageComponent } from './product-manage.component';
import { ProductListContainerComponent } from './components/product/product-list-container.component';
import { ProductCardComponent } from './components/product/product-card.component';
import { Category } from './components/category/category';
import { routing } from './product-manage.routing';
import { SharedModule } from '../../shared/shared.module';
import { ProductDetailsComponent } from './components/product/product-details.component';
import { ProductListDisplayComponent } from './components/product/product-list-display.component';
import { ProductEffects } from './effects/products.effects';

@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    ProductManageComponent,
    ProductListContainerComponent,
    ProductListDisplayComponent,
    ProductCardComponent,
    ProductDetailsComponent
  ]
})
export default class ProductManageModule {}
