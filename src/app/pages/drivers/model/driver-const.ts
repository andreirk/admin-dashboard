/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { DriverStatus, VehicleType } from '../../../shared/types';

export const driverStatusColorsMap = new Map([
  [ DriverStatus.ORDER_EXECUTION, '#111D59'], // blue
  [ DriverStatus.READY, '#21C53D'],  // green
  [ DriverStatus.ORDER_OFFLINE, '#DA3E18'], // red
  [ DriverStatus.OFFLINE, '#D0D0D0'] // grey
]);

export const vehicleTypeIconMap = new Map([
  [VehicleType.CAR, '\uf1b9'],
  [VehicleType.SCOOTER, '\uf21c'],
  [VehicleType.TRUCK, '\uf0d1'],
]);
