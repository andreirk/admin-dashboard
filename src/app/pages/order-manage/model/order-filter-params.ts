/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { OrderStatus, DeliveryStatus } from '../../../shared/types';
export class OrderFilterParams {
  public fromDate?: number;
  public toDate?: number;
  public statusList?: OrderStatus[];
  public deliveryStatusList?: DeliveryStatus[];

  constructor() {
  }
}
