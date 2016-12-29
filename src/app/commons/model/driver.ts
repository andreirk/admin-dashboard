/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { DriverAccount } from './driver-account';
import { DriverProfile } from './driver-profile';

export class Driver {
  public account: DriverAccount = new DriverAccount();
  public profile: DriverProfile = new DriverProfile();

  constructor() {}
}
