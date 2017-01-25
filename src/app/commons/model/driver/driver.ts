/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { DriverProfile } from './driver-profile';
import { Rating } from '../rating';

export class Driver extends DriverProfile {
  public phone: string = '';
  public email: string = '';
  public password: string = '';
  public rating: Rating = new Rating();

  constructor() {
    super();
  }
}
