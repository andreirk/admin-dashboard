/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { DriverStatus } from '../../../shared/types';
export class DriverFilterParamsForm {
  public searchPattern: string = '';
  public orderId: string = '';
  public driverStatus: DriverStatus = null;

  constructor() {
  }
}
