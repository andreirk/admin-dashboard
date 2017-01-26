/*
 * Copyright © 2017 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Injectable } from '@angular/core';
import { DeliveryAddress } from '../../../commons/model/order';
import { Pos } from '../../../commons/model/pos';

@Injectable()
export class PosViewModelService {

  static copyAddressLines(addressToFill: DeliveryAddress, address: DeliveryAddress) {
    addressToFill.addressLine1 = address.addressLine1;
    addressToFill.addressLine2 = address.addressLine2;
    addressToFill.area = address.area;
    addressToFill.city = address.city;
    addressToFill.state = address.state;
    addressToFill.country = address.country;
    addressToFill.zip = address.zip;
    return addressToFill;
  }

  static checkRequiredFields(pos: Pos): boolean {
    return (pos && pos.address && pos.address.geoPoint && pos.address.geoPoint.lat && pos.address.geoPoint.lon) ? true : false;
  }

  static checkAddressLinesModified(address: DeliveryAddress, anotherAddress: DeliveryAddress): boolean {
    for (let field in address) {
      if (address[field] == '') address[field] = undefined;
    }
    for (let field in anotherAddress) {
      if (anotherAddress[field] == '') anotherAddress[field] = undefined;
    }

    return !(address.addressLine1 == anotherAddress.addressLine1 &&
    address.addressLine2 == anotherAddress.addressLine2 &&
    address.area == anotherAddress.area &&
    address.city == anotherAddress.city &&
    address.state == anotherAddress.state &&
    address.country == anotherAddress.country &&
    address.zip == anotherAddress.zip);
  }

}
