/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Pipe, PipeTransform } from '@angular/core';
import { DeliveryAddress } from '../../commons/model/order';
@Pipe({
  name: 'amAddress'
})
export class AddressPipe implements PipeTransform {
  transform(value: DeliveryAddress): string {
    return 'city: ' + value.city + ' address: ' + value.addressLine1;
  }
}
