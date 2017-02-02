/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, ValidatorFn, AbstractControl, Validator, Validators } from '@angular/forms';

export function matchValueValidator(value: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const controlValue = control.value;
    return (controlValue !== value) ? {'matchValue': {controlValue}} : null;
  };
}

@Directive({
  selector: '[amMatchValue]',
  providers: [{provide: NG_VALIDATORS, useExisting: MatchValueValidatorDirective, multi: true}]
})
export class MatchValueValidatorDirective implements Validator, OnChanges {
  @Input() amMatchValue: string;
  private valFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['amMatchValue'];
    if (change) {
      this.valFn = matchValueValidator(change.currentValue);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}

