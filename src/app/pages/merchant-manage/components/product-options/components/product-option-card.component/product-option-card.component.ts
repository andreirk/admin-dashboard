/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MerchantProductAppState } from '../../../../store/index';

@Component({
    selector: 'am-product-option-card',
    template: require('./product-option-card.component.html')
})
export class ProductOptionCardComponent implements OnInit {

    @Input() productOption;
    @Output() deleteProductOption = new EventEmitter();

    constructor(private router: Router,
                private route: ActivatedRoute,

    ) { }

    ngOnInit() { }

  // editProductOption(id){
  //   this.router.navigate(['./', id],{ relativeTo: this.route })
  // }

  onClickDelete(id){
    console.log('delete id', id);
    this.deleteProductOption.emit(id)
  }

}
