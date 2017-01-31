/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { VehicleType, Currency } from '../../../shared/types';
import { DriverAddress } from './driver-address';

export class DriverProfile {
  public id: number = null;
  public firstName: string = null;
  public lastName: string = null;

  public avatarUrl: string = '';
  public capacity: VehicleType = VehicleType.CAR;
  public carBrand: string = null;
  public carColor: string = null;
  public carPlateNumber: string = null;
  public carType: string = null;
  public licenseNumber: string = null;
  public maxPaymentAmounts: MaxPaymentAmount[] = [];
  public iban: string = null;
  public iqama: string = null;
  public birthDate: number = null; // timestamp in seconds
  public address: DriverAddress = new DriverAddress();

  constructor() {
  }
}

export class MaxPaymentAmount {
  public currency: Currency;
  public value: number;

  constructor() {
  }
}

