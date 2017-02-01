/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { DriverStatus } from '../../../shared/types';
export class DriverFilterParamsForm {
  public searchPattern: string = null;
  public driverStatus: DriverStatus = null;

  constructor() {
  }
}
