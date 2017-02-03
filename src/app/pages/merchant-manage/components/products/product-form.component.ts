/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';
import { Product } from '../../../../commons/model/product';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { MarketingAttributeType } from '../../../../shared/types';


@Component({
    selector: 'am-product-form',
    styles: [``],
    template: require('./product-form.component.html'),
})
export class ProductFormComponent implements OnInit {

  _product: Product;
  _originalProduct: Product;
  marketingAttrebutes = [];

  private wasModified = false;
  private rtlDetect = require('rtl-detect');

  @Input() set product(value : Product) {
    if(value) {
      this._product = _.cloneDeep(value);
      this._originalProduct = _.cloneDeep(value);
    }
  }
  get product(): Product {
    return this._product;
  }

  @Output() save = new EventEmitter();

  @ViewChild('productForm') form;


  constructor( ) {

    this.marketingAttrebutes = this.fillMarketingAttributes(MarketingAttributeType)

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    this.form.control.valueChanges.debounceTime(500)
      .subscribe(values => {
        this.wasModified = !_.isEqual(this._product, this._originalProduct);

      });
  }

  onSelectCategory(event){
    this.product.categoryId = event.id;
  }

  onSelectGroup(event){
    this.product.groupIds.push(event);
  }

  onRemoveGroup(removedGroupId){
    this.product.groupIds = this.product.groupIds.filter(groupId => groupId !== removedGroupId)
  }

  onSelectTag(event){
    if(!this.product.tagValues){
      this.product.tagValues = []
    }
    this.product.tagValues.push(event.text);
  }

  onRemoveTag(removedTag){
    this.product.tagValues = this.product.tagValues.filter(tag => tag !== removedTag.text);
  }

  onSelectMarketingAttrebute(attribute){
      this.product.marketingAttribute = attribute;
  }

  onChangeFired(event){
    this.wasModified = true;
  }

  fillMarketingAttributes(enumItems){
    let arr = [];
    for (let type in enumItems){
      arr.push(type);
    }
    // for empty
    arr.push("-")

    return arr;
  }

/////////////////////////////////////////////////////////
}

