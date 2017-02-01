/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input } from '@angular/core';
import { UserCacheService } from '../services/user-cache.service';
import { DriverCacheService } from '../services/driver-cache.service';
import { DriverBalanceRecord } from '../../../commons/model/driver/driver-balance-record';
@Component({
  selector: '[am-balance-record-row]',
  styleUrls: ['./style'],
  template: `
<td>{{balanceRecord.creationDate*1000 | date:'short'}}</td>
<td>
<a class="link" [routerLink]="['../../../orders', balanceRecord.delivery]"
       (click)="false">
  {{balanceRecord.delivery | amSuffix:6}}
</a>
</td>
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
