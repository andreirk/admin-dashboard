/*
 * Copyright © 2017 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Component, Input, forwardRef } from '@angular/core';
import { Pos } from '../../../../../commons/model/pos';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ViewChild } from '@angular/core/src/metadata/di';

@Component({
  selector: 'am-pos-details-input-form',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PosDetailsInputFormComponent),
    multi: true
  }],
  template: `

<form #posDetailsForm="ngForm">
    <div class="row">
      <div class="form-group col-sm-6">
        <label class="label">Name</label>
        <input type="text" class="form-control" name="name" [(ngModel)]="pos.name"
               [ngStyle]="{'direction': langDirection}">
      </div>
      <div class="form-group col-sm-6">
        <label class="label">ZIP code</label>
        <input type="text" class="form-control" name="zip" [(ngModel)]="pos.address.zip">
      </div>
    </div>

    <div class="row">
      <div class="form-group col-sm-12">
        <label class="label">Description</label>
        <input type="text" class="form-control" name="description" [(ngModel)]="pos.description"
               [ngStyle]="{'direction': langDirection}">
      </div>
    </div>

    <div class="row">
      <div class="form-group col-sm-12">
        <label class="label">Address line 1</label>
        <input type="text" class="form-control" name="line1" [(ngModel)]="pos.address.addressLine1"
               [ngStyle]="{'direction': langDirection}">
      </div>
    </div>
    <div class="row">
      <div class="form-group col-sm-12">
        <label class="label">Address line 2</label>
        <input type="text" class="form-control" name="line2" [(ngModel)]="pos.address.addressLine2"
               [ngStyle]="{'direction': langDirection}">
      </div>
    </div>

    <div class="row">
      <div class="form-group col-sm-6">
        <label class="label">Area</label>
        <input type="text" class="form-control" name="area" [(ngModel)]="pos.address.area"
               [ngStyle]="{'direction': langDirection}">
      </div>
      <div class="form-group col-sm-6">
        <label class="label">City</label>
        <input type="text" class="form-control" name="city" [(ngModel)]="pos.address.city"
               [ngStyle]="{'direction': langDirection}">
      </div>
    </div>

    <div class="row">
      <div class="form-group col-sm-6">
        <label class="label">State</label>
        <input type="text" class="form-control" name="state" [(ngModel)]="pos.address.state"
               [ngStyle]="{'direction': langDirection}">
      </div>
      <div class="form-group col-sm-6">
        <label class="label">Country</label>
        <input type="text" class="form-control" name="country" [(ngModel)]="pos.address.country"
               [ngStyle]="{'direction': langDirection}">
      </div>
    </div>

    <div class="row">
      <div class="form-group col-sm-6">
        <label class="label">Lat</label>
        <input type="number" class="form-control" name="lat" step="any" [(ngModel)]="pos.address.geoPoint.lat" required>
      </div>
      <div class="form-group col-sm-6">
        <label class="label">Lon</label>
        <input type="number" class="form-control" name="lon" step="any" [(ngModel)]="pos.address.geoPoint.lon" required>
      </div>
    </div>
  </form>
  
`
})
export class PosDetailsInputFormComponent implements ControlValueAccessor {

  @ViewChild('posDetailsForm') form;
  @Input() pos: Pos = new Pos();

  ngAfterViewInit() {
    const vm = this;
    vm.form.control.valueChanges
      .subscribe(values => {
        vm.propagateChange(vm.pos);
      });
  }

  propagateChange = (_: any) => {};

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.pos = value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }
}
