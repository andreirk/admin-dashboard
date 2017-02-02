/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DriverBalanceRecordType } from '../../../shared/types';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

@Component({
  selector: 'am-balance-record-type-multiselect',
  template: `
  <am-multiselect-dropdown *ngIf="exist"
      [options]="balanceRecordTypeOptions"
      [settings]="settings"
      [(ngModel)]="selectedOptions"></am-multiselect-dropdown>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BalanceRecordTypeMultiselectComponent),
    multi: true
  }]

})
export class BalanceRecordTypeMultiselectComponent implements ControlValueAccessor {
  @Input() _selectedOptions: IMultiSelectOption[];
  private balanceRecordTypeOptions: IMultiSelectOption[] = [];
  private settings: IMultiSelectSettings = <IMultiSelectSettings> {
    dynamicTitleMaxItems: 1
  };
  private exist = false;


  constructor() {
    this.addBalanceRecordTypeOptions();
    this.exist = true;
  }

  addBalanceRecordTypeOptions() {
    for (let status in DriverBalanceRecordType) {
      if (!(parseInt(status, 10) >= 0)) {
        this.balanceRecordTypeOptions.push(
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
