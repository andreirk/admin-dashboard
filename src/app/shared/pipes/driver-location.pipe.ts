/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Pipe, PipeTransform } from '@angular/core';
import { DriverLocation } from '../../commons/model/driver/driver-location';

@Pipe({
  name: 'amDriverLocation'
})
export class DriverLocationPipe implements PipeTransform {
  transform(value: DriverLocation | string): string {
    if (value instanceof DriverLocation) {
      return 'lon: ' + value.lon + ' lat: ' + value.lat;
    } else {
      return value;
    }
  }
}
