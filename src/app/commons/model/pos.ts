/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { DeliveryAddress } from './order';

export class Pos {
  public id: string;
  public name: string;
  public description: string;
  public address: DeliveryAddress = new DeliveryAddress();

  constructor() {
  }
}
