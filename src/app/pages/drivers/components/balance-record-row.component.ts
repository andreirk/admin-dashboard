/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input } from '@angular/core';
import { UserCacheService } from '../services/user-cache.service';
import { DriverCacheService } from '../services/driver-cache.service';
import { DriverBalanceRecord } from '../../../commons/model/driver/driver-balance-record';
@Component({
  selector: '[am-balance-record-row]',
  template: `
<td>{{balanceRecord.creationDate*1000 | date:'short'}}</td>
<td>{{balanceRecord.delivery}}</td>
<td>{{balanceRecord.type}}</td>
<td>{{balanceRecord.description}}</td>
<td>{{balanceRecord.value | currency:balanceRecord.currency}}</td>
<td>{{balanceRecord.currentBalance | currency:balanceRecord.currency}}</td>
`
})
export class BalanceRecordRowComponent {
  @Input() balanceRecord: DriverBalanceRecord;

  constructor() {
  }
}
