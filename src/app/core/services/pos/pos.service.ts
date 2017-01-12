/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from "@angular/core";
import { BackendApiService } from "../backend-api.service";
import { Observable } from "rxjs";
import { Pos } from "../../../commons/model/pos";
import { MerchantBackendService } from "../merchants/merchant-backend.service";
import { WorkTimeService } from "../work-times/work-time.service";
import { WorkTimeType } from "../../../shared/types";
import { WorkTime } from "../../../commons/model/work-time";

@Injectable()
export class PosService {
  private path: string = '/catalog/mgmt/v1/pos';

  constructor(private backendApi: BackendApiService,
              private merchantBackendApi: MerchantBackendService,
              private workTimeApi: WorkTimeService) {
  }

  get(id: string, lang: string): Observable<Pos> {
    return this.backendApi.get(this.path + '/' + id, {}, lang);
  }

  savePos(merchantId: string, pos: Pos, posOriginal: Pos, lang: string): Observable<string> {
    if (!pos.id || !_.isEqual(pos, posOriginal)) {
      return this.save(merchantId, pos, lang);
    } else {
      return Observable.of(pos.id);
    }
  }

  save(merchantId: string, pos: Pos, lang: string): Observable<string> {
    if (pos.id) {
      return this.update(pos, lang);
    } else {
      return this.create(merchantId, pos, lang).map(posId => {
        this.fillPosWorktimes(posId);
        return posId;
      });
    }
  }

  create(merchantId: string, pos: Pos, lang: string): Observable<string> {
    return this.merchantBackendApi.createMerchantsPos(merchantId, pos, lang).map(result => result.id);
  }

  update(pos: Pos, lang: string): Observable<string> {
    return this.backendApi.put(this.path + '/' + pos.id, pos, {}, lang)
      .map(result => {
        if (result.result === true) {
          return pos.id;
        } else {
          return null;
        }
      });
  }

  deletePos(posId: string): Observable<boolean> {
    return this.backendApi.delete(this.path + '/' + posId).map(resp => resp.result);
  }

  fillPosWorktimes(posId: string): void {
    if (posId) {
      for (var i = 1; i <= 7; i++) {
        var workTime: WorkTime = new WorkTime;
        workTime.startTime = '00:00';
        workTime.endTime = '24:00';
        workTime.weekday = i;
        workTime.type = WorkTimeType.REGULAR;

        this.workTimeApi.createPosWorkTime(posId, workTime).subscribe();

        workTime.type = WorkTimeType.RAMADAN;
        this.workTimeApi.createPosWorkTime(posId, workTime).subscribe();
      }
    }
  }

}
