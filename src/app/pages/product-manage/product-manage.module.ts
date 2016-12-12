import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ProductManageComponent } from './product-manage.component';
import { ProductListComponent } from './components/product/product-list.component';
import { ProductCardComponent } from './components/product/product-card.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryListComponent } from './components/category/category-list.component';

import { routing } from './product-manage.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    ProductManageComponent,
    ProductListComponent,
    ProductCardComponent,
    CategoryComponent,
    CategoryListComponent
  ]
})
export default class ProductManageModule {}