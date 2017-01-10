/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
export interface DriverOnMap {
  lat: number;
  lon: number;
  driverId: number;
  capacity: string;
  alive: boolean;
  heading: number;
  icon ? : string;
  orderId ? : number;
}
