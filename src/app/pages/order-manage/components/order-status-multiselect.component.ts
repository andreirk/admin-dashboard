/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { OrderStatus, DeliveryStatus } from '../../../shared/types';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

@Component({
  selector: 'am-order-status-multiselect',
  template: `
  <ss-multiselect-dropdown *ngIf="exist"
      [options]="orderStatusOptions"
      [settings]="settings"
      [(ngModel)]="selectedOptions"></ss-multiselect-dropdown>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OrderStatusMultiselectComponent),
    multi: true
  }]

})
export class OrderStatusMultiselectComponent implements ControlValueAccessor {
  @Input() _selectedOptions: string[];
  private orderStatusOptions: IMultiSelectOption[] = [];
  private settings: IMultiSelectSettings = <IMultiSelectSettings> {
    dynamicTitleMaxItems: 1
  };
  private exist = false;


  constructor() {
    this.addOrderStatusOptions();
    this.exist = true;
  }

  addOrderStatusOptions() {
    for (let status in OrderStatus) {
      if (!(parseInt(status, 10) >= 0)) {
        this.orderStatusOptions.push(
          <IMultiSelectOption> {
            id: status,
            name: (status === 'ACCEPTED') ? 'EXECUTION' : status
          }
        );
        if (status === 'ACCEPTED') {
          this.addDeliveryStatusOptions();
        }
      }
    }
  }

  addDeliveryStatusOptions() {
    for (let status in DeliveryStatus) {
      if (!(parseInt(status, 10) >= 0)) {
        this.orderStatusOptions.push(
          <IMultiSelectOption> {
            id: status,
            name: status
          }
        );
      }
    }
  }

  // custom form control methods
  get selectedOptions() {
    return this._selectedOptions;
  }

  set selectedOptions(val) {
    this._selectedOptions = val;
    this.propagateChange(val);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectedOptions = value;
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
