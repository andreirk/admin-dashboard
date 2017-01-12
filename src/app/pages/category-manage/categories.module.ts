/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { NgModule } from '@angular/core';
import { routing } from './categories.routing';
import { SharedModule } from '../../shared/shared.module';
import { CategoryComponent } from './components/category.component';
import { CategoryCardComponent } from './components/category-card.component';
import { CategoryFormComponent } from './components/category-from.component';
import { CategoryListComponent } from './components/category-list.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    CategoryComponent,
    CategoryCardComponent,
    CategoryFormComponent,
    CategoryListComponent
  ]
})
export default class CategoriesModule { }
