/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from "@angular/core";
import { BackendApiService } from "../backend-api.service";
import { Observable } from "rxjs";
import { WorkTime } from "../../../commons/model/work-time";

@Injectable()
export class WorkTimeService {

  private posPath: string = '/catalog/mgmt/v1/pos';
  private workTimePath: string = '/catalog/mgmt/v1/worktime';

  constructor(private backendApi: BackendApiService) {
  }

  savePosWorkTime(posId: string, workTime: WorkTime): Observable<WorkTime> {
    if (!posId || !workTime) return Observable.of(null);

    if (workTime.id) {
      return this.updatePosWorkTime(workTime.id, workTime);
    } else {
      return this.createPosWorkTime(posId, workTime);
    }
  }

  createPosWorkTime(posId: string, workTime: WorkTime): Observable<WorkTime> {
    return this.backendApi.post(this.posPath + '/' + posId + '/worktime', workTime, {});
  }

  updatePosWorkTime(wtId: string, workTime: WorkTime): Observable<WorkTime> {
    return this.backendApi.put(this.workTimePath + '/' + wtId, workTime, {}, 'en');
  }

  getAllPosWorkTimes(posId: string): Observable<WorkTime[]> {
    return this.backendApi.get(this.posPath + '/' + posId + '/worktime', {});
  }

  getWorkTime(workTimeId: string): Observable<WorkTime> {
    return this.backendApi.get(this.workTimePath + '/' + workTimeId, {});
  }

  deleteWorkTime(workTimeId: string): Observable<boolean> {
    return this.backendApi.delete(this.workTimePath + '/' + workTimeId).map(wt => wt.result);
  }

}
