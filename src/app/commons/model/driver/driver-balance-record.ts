/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { DriverBalanceRecordType, Currency } from '../../../shared/types';

export class DriverBalanceRecord {
  public id: number = null;
  public driverId: number = null;

  public creationDate: string = null;
  public currency: Currency = Currency.SAR;
  public currentBalance: number = 0;
  public delivery: string = null;
  public description: string = null;
  public type: DriverBalanceRecordType = DriverBalanceRecordType.PICKUP_COST;
  public value: number = null;

  constructor() {
  }
}
