/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProductOption } from '../../../../../../commons/model/product-option';

@Component({

    selector: 'am-product-option-form',
    styles: [require('./product-option-form.component.scss')],
    template: require('./product-option-form.component.html')
})
export class ProductOptionFormComponent implements OnInit {

    _productOption: ProductOption;
    _originalProductOption: ProductOption;
    _deletedValues = [];

    private wasModified = false;
    private rtlDetect = require('rtl-detect');
    @Output() saveForm = new EventEmitter();

    @Input() set productOption(value : ProductOption) {
      if(value) {
        this._productOption = _.cloneDeep(value);
        this._originalProductOption = _.cloneDeep(value);
      }
    }
    get productOption(): ProductOption {
      return this._productOption;
    }

    @ViewChild('productOptionForm') form;

    constructor() {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {

      this.form.control.valueChanges.debounceTime(500)
        .subscribe(values => {
          this.wasModified = !_.isEqual(this._productOption, this._originalProductOption);

        });
    }

    onNameChange(event){
        this.productOption.name = event;
    }

    onTitleChange(event){
        this.productOption.title = event;
    }

    onRequiredChange(event){
        this.productOption.required = event;
    }

    onMultiselectChange(event){
        this.productOption.multiselect = event;
    }

    onNewValueCreated(value){
      console.log('in form onValueDeleted', value);
      this.productOption.values.push(value);
    }

    onSave(){

      let productValuesAll = this.productOption.values;
      let productValuesToDelete = this._deletedValues;
      let difference = _.differenceBy(productValuesAll, productValuesToDelete, 'name');
      console.log('on save', {productValuesAll, productValuesToDelete, difference});
      this.productOption.values = difference;
      this.saveForm.emit({productOption: this.productOption, productValuesToDelete});
    }

    onValueDeleted(value){
      console.log('in form onValueDeleted', value);
      this._deletedValues.push(value.data);
    }

}
