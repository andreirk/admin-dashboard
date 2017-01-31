/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, forwardRef } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'am-datepicker',
  template: `
<div class='input-group'>
  <input class="form-control" placeholder="yyyy-mm-dd" name="d" [(ngModel)]="ngbDate" [minDate]="minDate" [maxDate]="maxDate"
         ngbDatepicker #d="ngbDatepicker">
  <div class="input-group-addon" (click)="d.toggle()" >
    <span class="glyphicon glyphicon-calendar"><i class="fa fa-calendar" aria-hidden="true"></i></span>
  </div>
</div>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
  }]
})
export class DatepickerComponent implements ControlValueAccessor {
  @Input()
  private _ngbDate: NgbDateStruct;
  private minDate: NgbDateStruct = <NgbDateStruct> {
    year: 1950,
    month: 1,
    day: 1
  };
  private maxDate: NgbDateStruct = <NgbDateStruct> {
    year: 2050,
    month: 1,
    day: 1
  };

  ngbDate2num(date: NgbDateStruct) {
    return new Date(date.year, date.month - 1, date.day).getTime() / 1000;
  }

  num2ngbDate(num: number) {
    let date: Date = new Date();
    date.setTime(num * 1000);

    return <NgbDateStruct>{
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

  get ngbDate() {
    return this._ngbDate;
  }

  set ngbDate(val) {
    this._ngbDate = val;
    if (val) {
      this.propagateChange(this.ngbDate2num(val));
    } else {
      this.propagateChange(null);
    }
  }

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.ngbDate = this.num2ngbDate(value);
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }
}
