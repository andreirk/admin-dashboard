import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ProductComponent } from './product.component';
import { routing } from './product.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    ProductComponent
  ]
})
export default class NewModule {}