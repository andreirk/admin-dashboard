/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { ViewListService } from '../../../core/services/view-list.service';
import { DriverService } from '../../../core/services/drivers/driver.service';
import { Observable } from 'rxjs';
import { Page } from '../../../commons/model/page';
import { DriverBalanceRecord } from '../../../commons/model/driver/driver-balance-record';

@Injectable()
export class BalanceRecordListService extends ViewListService<DriverBalanceRecord> {
  constructor(private driverService: DriverService) {
    super();
  }

  getPage(page: number, size: number, lang: string, filterParams: any): Observable<Page<DriverBalanceRecord>> {
    return this.driverService.getBalanceRecordsPage(page, size, filterParams);
  }
}
