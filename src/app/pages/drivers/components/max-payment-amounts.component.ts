/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Currency } from '../../../shared/types';
import { MaxPaymentAmount } from '../../../commons/model/driver/driver-profile';

@Component({
  selector: 'am-max-payment-amounts',
  template: `
  <div class="form-group" *ngFor="let paymentAmount of viewPaymentAmounts;">
    <label>{{paymentAmount.currency}}</label>
    <input type="number" class="form-control" name="{{ 'mpa_' + paymentAmount.currency }}" (keyup)="changeMpa()" [(ngModel)]="paymentAmount.value">
  </div>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MaxPaymentAmountsComponent),
    multi: true
  }]
})
export class MaxPaymentAmountsComponent implements ControlValueAccessor {
  @Input() paymentAmounts: MaxPaymentAmount[] = [];
  private viewPaymentAmounts: MaxPaymentAmount[] = [];

  constructor() {
    for (let type in Currency) {
      if (!(parseInt(type, 10) >= 0)) {
        this.viewPaymentAmounts.push(<MaxPaymentAmount> {
          currency: Currency[Currency[type]],
          value: null
        });
      }
    }
  }

  changeMpa() {
    this.view2model();
    this.propagateChange(this.paymentAmounts);
  }

  model2view() {
    const vm = this;
    vm.viewPaymentAmounts.forEach(viewPa => {
      let pa = vm.paymentAmounts.find(pa => pa.currency === viewPa.currency);
      if (pa) {
        viewPa.value = pa.value;
      }
    });
  }

  view2model() {
    const vm = this;
    vm.viewPaymentAmounts.forEach(viewPa => {
      if (viewPa.value == 0 || viewPa.value == null) {
        vm.paymentAmounts = vm.paymentAmounts.filter(pa => pa.currency !== viewPa.currency);
      } else {
        let pa = vm.paymentAmounts.find(pa => pa.currency === viewPa.currency);
        if (pa) {
          viewPa.value = pa.value;
        } else {
          vm.paymentAmounts.push(viewPa);
        }
      }
    });
  }

// custom form control methods
  propagateChange = (_: any) => {};

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.paymentAmounts = value;
      this.model2view();
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }
}
