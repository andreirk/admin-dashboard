/*
 * Copyright © 2017 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { DeliveryAddress, PointOnMap } from '../../../commons/model/order';

const GOOGLE_API_KEY = 'AIzaSyC2H1X8OzJNzGqRYO8FLGC64HmLEwE0Nwk';

const ORDERED_ADDRESS_FIELDS: string[] = [
  'addressLine1',
  'addressLine2',
  'area',
  'city',
  'state',
  'country',
  'zip'
];

@Injectable()
export class GoogleGeocodingService {

  private googleApi;

  constructor() {
    this.googleApi = require('@google/maps').createClient({
      key: GOOGLE_API_KEY,
      Promise: Promise
    });
  }

  geocodeAddress(address: DeliveryAddress, lang: string): Promise<any> {
    const vm = this;
    let addressString = GoogleGeocodingService.getAddressString(address);
//    console.log('Address:', addressString);
    if (!addressString) return undefined;
    let requestParams = {
      address: addressString,
      language: lang
    };
    return this.googleApi.geocode(requestParams).asPromise();
  }

  static getGeoPointFromGoogleResponse(googleResponse): PointOnMap {
    if (!googleResponse
      || !googleResponse[0]
      || !googleResponse[0].geometry
      || !googleResponse[0].geometry.location) {
      return undefined;
    }
    let geoPoint = new PointOnMap();
    geoPoint.lat = googleResponse[0].geometry.location.lat;
    geoPoint.lon = googleResponse[0].geometry.location.lng;
    return geoPoint;
  }


  static getAddressString(address: DeliveryAddress): string {
    if (!address) return undefined;

    let result = '';

    let i = 0;
    for (let fieldName of ORDERED_ADDRESS_FIELDS) {
      if (address[fieldName] && address[fieldName].trim() !== '') {
        if (i != 0) {
          result += ', ';
        }
        result += address[fieldName].trim();
        i++;
      }
    }
    if (result == '') result = undefined;
    return result;
  }

  reverseGeocodeLocation(location: PointOnMap): DeliveryAddress {
    return undefined;
  }



}
