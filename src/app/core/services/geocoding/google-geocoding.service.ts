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

const ADDRESS_FIELDS_MAP = new Map([
  ['street_number',               'addressLine1'],
  ['route',                       'addressLine1'],
  ['street_address',              'addressLine1'],
  ['locality',                    'city'],
  ['administrative_area_level_2', 'area'],
  ['administrative_area_level_1', 'state'],
  ['country',                     'country'],
  ['postal_code',                 'zip']
]);

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
    return vm.googleApi.geocode(requestParams).asPromise();
  }

  static getGeoPointFromGeocodingResponseJson(googleResponse): PointOnMap {
    if (!googleResponse
      || !googleResponse.results
      || !googleResponse.results[0]
      || !googleResponse.results[0].geometry
      || !googleResponse.results[0].geometry.location) {
      return undefined;
    }
    let geoPoint = new PointOnMap();
    geoPoint.lat = googleResponse.results[0].geometry.location.lat;
    geoPoint.lon = googleResponse.results[0].geometry.location.lng;
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

  reverseGeocodeLocation(location: PointOnMap, lang: string): Promise<any> {
    const vm = this;
    if (!location || !location.lat || !location.lon) return undefined;

    let latlng = {
      lat: location.lat,
      lng: location.lon
    };

    let requestParams = {
      latlng: latlng,
      language: lang
    };

    return vm.googleApi.reverseGeocode(requestParams).asPromise();
  }

  static getAddressFromReverseGeocodingResponseJson(googleResponse): DeliveryAddress {
    if (!googleResponse
      || !googleResponse.results
      || !googleResponse.results[0]
      || !googleResponse.results[0].address_components) {
      return undefined;
    }
    let addrComponents = googleResponse.results[0].address_components;

    let newAddress: DeliveryAddress = new DeliveryAddress();

    for (let googleField of addrComponents) {
      let addrFieldName = undefined;
      for (let type of googleField.types) {
        addrFieldName = ADDRESS_FIELDS_MAP.get(type);
        if (addrFieldName) break;
      }
      if (addrFieldName) {
        if (!newAddress[addrFieldName]) {
          newAddress[addrFieldName] = '';
        } else {
          newAddress[addrFieldName] += ' ';
        }
        newAddress[addrFieldName] += googleField.long_name;
      }
    }
    return newAddress;
  }


}
