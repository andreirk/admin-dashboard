/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { DriverBalanceRecordType, Currency } from '../../../shared/types';

export class BalanceRecordFilterParams {
  public driverId?: number;
  public deliveryId?: string;
  public types?: DriverBalanceRecordType[];
  public fromDate?: number;
  public toDate?: number;
  public currency?: Currency;
}
