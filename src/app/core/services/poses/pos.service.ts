/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { BackendApiService } from '../backend-api.service';
import { Observable } from 'rxjs';
import { Pos } from '../../../commons/model/pos';

@Injectable()
export class PosService {
  private path: string = '/catalog/mgmt/v1/pos';

  constructor(private backendApi: BackendApiService) {
  }

  get(id: string, lang: string): Observable<Pos> {
    return this.backendApi.get(this.path + '/' + id, {}, lang);
  }

}
