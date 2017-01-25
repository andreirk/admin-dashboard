/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { ViewListService } from '../../../core/services/view-list.service';
import { DriverService } from '../../../core/services/drivers/driver.service';
import { Observable } from 'rxjs';
import { Page } from '../../../commons/model/page';
import { DriverInfo } from '../../../commons/model/driver/driver-info';

@Injectable()
export class DriverInfoListService extends ViewListService<DriverInfo> {
  constructor(private driverService: DriverService) {
    super();
  }

  getPage(page: number, size: number, lang: string, filterParams: any): Observable<Page<DriverInfo>> {
    return this.driverService.getDriverInfoPage(page, size, filterParams);
  }
}
