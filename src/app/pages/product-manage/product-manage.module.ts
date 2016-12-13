import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ProductManageComponent } from './product-manage.component';
import { ProductListComponent } from './components/product/product-list.component';
import { ProductCardComponent } from './components/product/product-card.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryListComponent } from './components/category/category-list.component';
import { CategoryCardComponent } from './components/category/category-card.component';
import { CategoryService } from './components/category/category.service'
import { ProductService } from './products-service'

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
    CategoryListComponent,
    CategoryCardComponent
  ],
  providers: [ CategoryService, ProductService ]
})
export default class ProductManageModule {}