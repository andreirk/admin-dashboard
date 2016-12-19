import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { ProductManageComponent } from './product-manage.component';
import { ProductListComponent } from './components/product/product-list.component';
import { ProductCardComponent } from './components/product/product-card.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryListComponent } from './components/category/category-list.component';
import { CategoryCardComponent } from './components/category/category-card.component';
import { CategoryService } from './components/category/category.service'
import { ProductService } from './products-service'
import { CategoryFormComponent } from './components/category/category-from.component';
import { StringListFilter } from './../../theme/pipes';
import { NgaModule } from '../../theme/nga.module';
import { Category } from './components/category/category';
import { LanguageSwitchComponent } from './../../commons/components/language-switch/language-switch.component';

import { routing } from './product-manage.routing';


@NgModule({
  imports: [
    AngularFormsModule,
    CommonModule,
    NgaModule,
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
  ],
  providers: [ CategoryService, ProductService ]
})
export default class ProductManageModule {}