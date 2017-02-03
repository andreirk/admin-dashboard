/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'am-product-option-card',
    template: require('./product-option-card.component.html')
})
export class ProductOptionCardComponent implements OnInit {

    @Input() productOption;
    @Output() deleteProductOption = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    onClickDelete(id){
      this.deleteProductOption.emit(id)
    }

}
