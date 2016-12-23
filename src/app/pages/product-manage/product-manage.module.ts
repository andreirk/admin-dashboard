import { NgModule }      from '@angular/core';
import { ProductManageComponent } from './product-manage.component';
import { ProductListComponent } from './components/product/product-list.component';
import { ProductCardComponent } from './components/product/product-card.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryListComponent } from './components/category/category-list.component';
import { CategoryCardComponent } from './components/category/category-card.component';
import { CategoryFormComponent } from './components/category/category-from.component';
import { StringListFilter } from './../../theme/pipes';
import { Category } from './components/category/category';
import { LanguageSwitchComponent } from './../../commons/components/language-switch/language-switch.component';

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
    ProductCardComponent,
    CategoryComponent,
    CategoryListComponent,
    CategoryCardComponent,
    CategoryFormComponent,
    StringListFilter,
    LanguageSwitchComponent
  ]
})
export default class ProductManageModule {}
