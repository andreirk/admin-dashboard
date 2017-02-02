/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: 'input[amNullIfEmpty]',
  host: {
    '(input)': 'onInputChange($event)'
  }
})
export class NullIfEmptyDirective {
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  onInputChange($event) {
    if ($event.target.value === '') {
      this.ngModelChange.emit(null);
    }
  }
}

