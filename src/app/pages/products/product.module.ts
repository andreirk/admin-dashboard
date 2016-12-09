import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ProductListComponent, ProductCard } from './product.component';
import { routing } from './product.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    ProductListComponent, ProductCard
  ]
})
export default class NewModule {}