/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Page } from '../../../commons/model/page';
import { User } from '../../../commons/model/user';
import { Driver } from '../../../commons/model/driver/driver';

export class OrderFilterPersons {
  users: Page<User> = new Page<User>();
  drivers: Page<Driver> = new Page<Driver>();
}
