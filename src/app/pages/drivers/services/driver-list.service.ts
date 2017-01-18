/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { ViewListService } from '../../../core/services/view-list.service';
import { DriverService } from '../../../core/services/drivers/driver.service';
import { DriverProfile } from '../../../commons/model/driver-profile';
import { Observable } from 'rxjs';
import { Page } from '../../../commons/model/page';

@Injectable()
export class DriverListService extends ViewListService<DriverProfile> {
  constructor(private driverService: DriverService) {
    super();
  }

  getPage(page: number, size: number, lang: string, filterParams: any): Observable<Page<DriverProfile>> {
    return this.driverService.getProfilesPage(page, size, filterParams);
  }
}
