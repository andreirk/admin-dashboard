/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultValue'
})
export class DefaultValuePipe implements PipeTransform {
  transform(value: any, defaultValue: string, condition?: boolean): any {
    if (condition === undefined) {
      return value ? value : defaultValue;
    } else {
      return (condition) ? defaultValue : value;
    }
  }
}
