/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProductService } from '../../../../core/services/products/products-service';
import { Product } from '../../../../commons/model/product';

@Component({
  selector: 'am-product-card',
  providers: [
    ProductService
  ],
  template: `

<div class="col-sm-7">
  <div class="card">
    <div class="card-block">
      <div class="d-flex">

         <div class="w-100">
          <h5 class="card-title">{{product.attributes.name}}</h5>
          <p class="card-text">{{product.attributes.description }}</p>
            <div class="pull-left">
                <a class="btn btn-primary " [routerLink]="[product.id]" >Edit</a>
                
            </div>
            <div class="pull-right">  
               
                <a class="btn btn-primary" href="" (click)="onClickDelete(product.id); false" >Delete</a>    
            </div>
        </div>
      </div>
    </div>
  </div>
</div>

`
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() lang: string = 'en';
  @Output() deleteProduct = new EventEmitter();

  constructor() {
  }

  onClickDelete(productId: number){
    this.deleteProduct.emit({ value: productId })
  }

  ngOnInit() {

  }

}
