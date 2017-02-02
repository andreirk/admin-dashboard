/*
 * Copyright © 2017 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Injectable } from '@angular/core';
import { DeliveryAddress, PointOnMap } from '../../../commons/model/order';
import { Pos } from '../../../commons/model/pos';
import { MapMarkerViewModel } from '../model/map-marker-view-model';
import { PosDetailsViewModel } from '../model/pos-details-view-model';
import { GoogleGeocodingService } from '../../../core/services/geocoding/google-geocoding.service';
import { Subject } from 'rxjs';

@Injectable()
export class PosViewModelService {

  constructor(private geocodingService: GoogleGeocodingService){
  }

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

  static updatePosMarkerViewModel(showResolved:boolean, currentPoint: PointOnMap, resolvedPoint: PointOnMap): any {
    let markers = [];
    if (currentPoint && currentPoint.lat && currentPoint.lon) {
      markers[0] = Object.assign(new MapMarkerViewModel(), {
        lat: currentPoint.lat,
        lon: currentPoint.lon,
        icon: getIcon('\uf041', 'red'),
      });
    } else {
      if (showResolved) {
        markers[0] = Object.assign(new MapMarkerViewModel(), {
          lat: 0,
          lon: 0,
          icon: getIcon('\uf041', 'red'),
        });
      }
    }
    if (showResolved) {
      markers[1] = Object.assign(new MapMarkerViewModel(), {
        lat: resolvedPoint.lat,
        lon: resolvedPoint.lon,
        icon: getIcon('\uf041', 'blue'),
      });
    }
    return markers;
  }

  geocodeAddress(model: PosDetailsViewModel, lang: string): any {
    const vm = this;
    let googleResponsePromise = vm.geocodingService.geocodeAddress(model.pos.address, lang);
    if (googleResponsePromise) {
      googleResponsePromise.then(result => {
        model = PosViewModelService.onGeocodeResponse(model, result);
      });
    }
    return model;
  }

  static onGeocodeResponse(model: PosDetailsViewModel, response): any {
    let point = GoogleGeocodingService.getGeoPointFromGeocodingResponseJson(response.json);
    if (point) {
      if (!model.pos.address.geoPoint.lat || !model.pos.address.geoPoint.lon) {
        model.pos.address.geoPoint = point;
      } else if (!_.isEqual(model.pos.address.geoPoint, point)) {
        model.resolvedPoint = point;
        model.showResolved = true;
      }
      model.lastModifiedPoint = _.cloneDeep(model.pos.address.geoPoint);
      model.lastModifiedAddress = _.cloneDeep(model.pos.address);
      model.unresolvedAddress = false;
    } else {
      model.unresolvedAddress = true;
    }
    return model;
  }

  reverseGeocode(model: PosDetailsViewModel, showModalConfirmSubject: Subject<any>, confirmAddressSubject: Subject<any>, lang: string): any {
    const vm = this;
    let googleResponsePromise = vm.geocodingService.reverseGeocodeLocation(model.pos.address.geoPoint, lang);
    if (googleResponsePromise) {
      googleResponsePromise.then(result => {
        model = vm.onReverseGeocodeResponse(model, showModalConfirmSubject, confirmAddressSubject, result);
      });
    }
    return model;
  }

  onReverseGeocodeResponse(model: PosDetailsViewModel, showModalConfirmSubject: Subject<any>, confirmAddressSubject: Subject<any>, response): any {
    const vm = this;
    model.resolvedAddress = GoogleGeocodingService.getAddressFromReverseGeocodingResponseJson(response.json);
    if (model.resolvedAddress
      && PosViewModelService.checkAddressLinesModified(model.pos.address, model.resolvedAddress)) {
      let currentAddressString = GoogleGeocodingService.getAddressString(model.pos.address);
      let resolvedAddressString = GoogleGeocodingService.getAddressString(model.resolvedAddress);

      let replaceAddressMessage = 'Resolved address differs from current address.\n\nCurrent address:\n' + currentAddressString
        + '\n\nResolved address:\n' + resolvedAddressString + '\n\nReplace current address?';

      showModalConfirmSubject.next(replaceAddressMessage);
    }
    confirmAddressSubject.asObservable().subscribe(answer => {
      if (answer === true) {
        model.pos.address = PosViewModelService.copyAddressLines(model.pos.address, model.resolvedAddress);
        model.lastModifiedAddress = _.cloneDeep(model.pos.address);
        model.lastModifiedPoint = _.cloneDeep(model.pos.address.geoPoint);
      }
    });
    return model;
  }


}

// get icon url for glyph
function getIcon(glyph, color ? , size = 40) {
  let canvas, ctx;
  canvas = document.createElement('canvas');
  canvas.width =  size + (size * 0.4);
  canvas.height = size + (size * 0.8);
  ctx = canvas.getContext('2d');
  if (color) {
    ctx.fillStyle = color;
  }
  ctx.font = (size * 0.9) + 'px FontAwesome';
  ctx.textBaseline="top";
  ctx.fillText(glyph, size/2 - 1, size - 1);
  return canvas.toDataURL();
}
