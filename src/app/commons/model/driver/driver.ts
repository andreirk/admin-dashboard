/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { DriverProfile } from './driver-profile';

export class Driver extends DriverProfile {
  public phone: string = '';
  public email: string = '';
  public password: string = '';

  constructor() {
    super();
  }
}
