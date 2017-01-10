/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { BackendApiService } from '../backend-api.service';
import { Observable } from 'rxjs';
import { WorkTime } from "../../../commons/model/work-time";

@Injectable()
export class WorkTimeService {

  private posPath: string = '/catalog/mgmt/v1/pos';

  constructor(private backendApi: BackendApiService) {
  }

  createPosWorkTime(posId: string, workTime: WorkTime, ): Observable<WorkTime> {
    return this.backendApi.post(this.posPath + '/' + posId + '/worktime', workTime, {});
  }
}
