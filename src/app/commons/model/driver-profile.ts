/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import {VehicleType, Currency} from "../../shared/types";

export class DriverProfile {
  public id: string= '';
  public firstName: string = '';
  public lastName: string = '';

  public avatarUrl: string;
  public capacity: VehicleType = VehicleType.CAR;
  public carBrand: string;
  public carColor: string;
  public carPlateNumber: string;
  public carType: string;
  public licenseNumber: string;
  public maxPaymentAmounts: MaxPaymentAmount[];
  public phone: string = '';
  public email: string = '';

  constructor() {
  }
}

export class MaxPaymentAmount {
  public currency: Currency;
  public value: number;

  constructor() {
  }
}
