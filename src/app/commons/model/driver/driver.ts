/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { DriverProfile } from './driver-profile';
import { Rating } from '../rating';

export class Driver extends DriverProfile {
  public phone: string = null;
  public email: string = null;
  public password: string = null;
  public rating: Rating = new Rating();

  constructor() {
    super();
  }
}
