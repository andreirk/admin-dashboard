import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'StringListSort',
  pure: false
})
export class StringListSort {
  tmp = [];
  transform (value, [queryString]) {
    this.tmp.length = 0;
    // console.log(value, queryString);
    var arr = value.filter((obj)=>new RegExp(queryString).test(obj.name));
    for (var i =0; i < arr.length; ++i) {
        this.tmp.push(arr[i]);
     }

    return this.tmp;
  }
}