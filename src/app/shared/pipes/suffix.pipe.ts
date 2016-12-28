/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'suffix'
})
export class SuffixPipe implements PipeTransform {
  transform(value: string, length: number): any {
    if (!value || value.length < length) {
      return value;
    } else {
      return value.substr(value.length - length, length);
    }
  }
}
