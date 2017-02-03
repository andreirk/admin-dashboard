/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, Input } from '@angular/core';
import { ProductOption } from '../../../../../commons/model/product-option';
import { Store } from '@ngrx/store';
import { MerchantProductAppState } from '../../../store/index';
import { ProductOptionActions } from '../actions/product-option.actions';

@Component({
    selector: 'am-product-option-list-display',
    template: `
 
    <div class="form-group col-sm-3">
      <label>Filter by name</label>
        <input type="text" class="form-control" name="name"
               [(ngModel)]="productOptionFilter.name" >

    </div>
    
    <div class="col-sm-3 card-block"> 
     <a class="btn btn-primary align-bottom" [routerLink]="['new']"
          routerLinkActive="active">New Product Option</a>  
    </div>   
 
  
    <am-product-option-card *ngFor="let option of productOptions | filterBy: ['name']: productOptionFilter.name "
        [productOption]="option"
        (deleteProductOption)="onDeleteProductOption($event)"    
        >
        
    </am-product-option-card>
      
`
})
export class ProductOpitonListDisplayComponent implements OnInit {

  productOptionFilter: any = { name: '' };

  @Input() productOptions: ProductOption[] = [];

  constructor(private store: Store<MerchantProductAppState>,
              private productOptionActions: ProductOptionActions) { }

  ngOnInit() { }

  onDeleteProductOption(id){
    this.store.dispatch( this.productOptionActions.deleteProductOption(id))
  }

}
