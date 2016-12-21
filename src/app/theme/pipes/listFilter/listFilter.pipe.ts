import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'StringListFilter',
  pure: false
})
export class StringListFilter {
  tmp = [];
  transform (value, [queryString]) {
    this.tmp.length = 0;
    var arr = value.filter((obj)=>new RegExp(queryString).test(obj.name));
    for (var i = 0; i < arr.length; ++i) {
        this.tmp.push(arr[i]);
     }

    return this.tmp;
  }
}