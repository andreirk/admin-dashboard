/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'amOrderBy'})
export class OrderByPipe implements PipeTransform {

  static _comparator(a:any, b:any):number{
    if(a < b) return -1;
    if(a > b) return 1;
    return 0;
  }

  transform(inputList: Array<any>, sortField: string, ascending: boolean): Array<any> {
    if (!sortField) {
      sortField = 'name';
    }

    return inputList.sort((a:any,b:any) => {
      return ascending ? OrderByPipe._comparator(a[sortField], b[sortField]) : -OrderByPipe._comparator(a[sortField], b[sortField]);
    });
  }
}
