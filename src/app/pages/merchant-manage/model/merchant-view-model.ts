/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Merchant } from '../../../commons/model/merchant';

export class MerchantViewModel {
  public merchant: Merchant = new Merchant();
  public linkedRootCategoryIds: string[] = [];

  constructor() {}
}
