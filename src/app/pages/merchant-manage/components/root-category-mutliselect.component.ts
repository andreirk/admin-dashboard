/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { MerchantBackendService } from '../../../core/services/merchants/merchant-backend.service';

@Component({
  selector: 'am-root-category-multiselect',
  template: `
  <ss-multiselect-dropdown *ngIf="exist" 
      [options]="rootCategoryOptions" 
      [(ngModel)]="selectedOptions"></ss-multiselect-dropdown>`,
  providers: [MerchantBackendService, {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RootCategoryMultiselectComponent),
    multi: true
  }]
})
export class RootCategoryMultiselectComponent implements OnChanges, ControlValueAccessor {
  @Input() _selectedOptions: string[];
  @Input() lang: string;
  private rootCategoryOptions: IMultiSelectOption[] = [];
  private exist = true;

  constructor(
    private merchantService: MerchantBackendService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['lang']) {
      const vm = this;
      vm.exist = false;
      vm.merchantService.getAvailableRootCategories(vm.lang).subscribe(rootCategories => {
        vm.rootCategoryOptions = <IMultiSelectOption[]>rootCategories;
        vm.exist = true;
      });
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
