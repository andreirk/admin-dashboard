/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Page } from '../../../commons/model/page';
import { User } from '../../../commons/model/user';
import { DriverProfile } from '../../../commons/model/driver-profile';

export class OrderFilterPersons {
  users: Page<User> = new Page<User>();
  drivers: Page<DriverProfile> = new Page<DriverProfile>();
}
