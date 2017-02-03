/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductActions } from './actions/product.actions';
import { MerchantProductAppState } from '../../store/index';

@Component({
    selector: 'am-product-list',
    template: `

    <div class="form-group col-sm-3">
      <label>Filter by name</label>
        <input type="text" class="form-control" name="name"
               [(ngModel)]="productFilter.name" >

    </div>
    
     <div class="col-sm-3 card-block"> 
      <a class="btn btn-primary align-bottom" [routerLink]="['new']"
          routerLinkActive="active">New Product</a>
     </div>

  <am-product-card *ngFor="let product of products | filterBy: ['attributes.name']: productFilter.name " 
      [product]="product"  
      (deleteProduct)="onDeleteProduct($event)"
  >
  </am-product-card>
  
`
})
export class ProductListDisplayComponent implements OnInit {

    productFilter: any = { name: '' };

    @Input() products;

    constructor(private route: ActivatedRoute,
                private store: Store<MerchantProductAppState>,
                private productActions: ProductActions) { }

    ngOnInit() { }

    onDeleteProduct(event){
      this.store.dispatch( this.productActions.deleteProduct(event.value))
    }

}
