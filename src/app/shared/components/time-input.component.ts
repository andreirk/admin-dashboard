/*
 * Copyright © 2017 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, forwardRef } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ViewChild } from '@angular/core/src/metadata/di';

@Component({
  selector: 'am-time-input',
  styleUrls: ['./time-input.style'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimeInputComponent),
    multi: true
  }],
  template: `
    <input type="number" min="0" max="{{maxHours}}" class="am-wt-control" name="hour-input" [ngClass]="{'am-wt-err' : error}" [(ngModel)]="hour">
    <label> : </label>
    <input type="number" min="0" max="{{maxMinutes}}" class="am-wt-control" name="minute-input" [ngClass]="{'am-wt-err' : error}" [(ngModel)]="minute">
`
})

export class TimeInputComponent implements ControlValueAccessor {

  @ViewChild('timeForm') form;

  @Input() time: string = '00:00';
  @Input() error: boolean = false;

  private _hour: string = '00';
  private _minute: string = '00';

  private maxHours: number = 24;
  private maxMinutes: number = 59;

  constructor() {
  }

  get hour() {
    return this._hour;
  }

  set hour(val) {
    if (val !== undefined && val !== null) {
      this._hour = val;
      this.updateTime();
      this.updateMaxValues();
    }
  }

  get minute() {
    return this._minute;
  }

  set minute(val) {
    if (val !== undefined && val !== null) {
      this._minute = val;
      this.updateTime();
      this.updateMaxValues();
    }
  }


  updateTime() {
    this.time = TimeInputComponent.convertHoursNumberToString(+this._hour, +this._minute) + ':' + TimeInputComponent.convertMinutesNumberToString(+this._minute, +this._hour);
    this.propagateChange(this.time);
  }

  updateMaxValues() {
  }

  propagateChange = (_: any) => {};

  writeValue(value): void {
    if (value !== undefined && value !== null) {
      this.time = value;
      let input = this.time.split(':');
      this._hour = TimeInputComponent.convertHoursNumberToString(+input[0], +input[1]);
      this._minute = TimeInputComponent.convertMinutesNumberToString(+input[1], +input[0]);
      this.updateMaxValues();
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  static convertMinutesNumberToString(minutes: number, hours: number): string {
    if (hours === 24) minutes = 0;
    minutes = Math.abs(minutes) % 60;
    return (minutes < 10) ? '0' + minutes : '' + minutes;
  }

  static convertHoursNumberToString(hours: number, minutes: number): string {
    let mod: number;
    if (minutes === 0) mod = 25;
    else mod = 24;

    hours = Math.abs(hours) % mod;
    return (hours < 10) ? '0' + hours : '' + hours;
  }

}
