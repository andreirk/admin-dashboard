/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Merchant } from "../model/merchant";
import { MerchantPage } from "../model/merchant-page";
import { BackendApiService } from "../../../services/backend-api.service";

@Injectable()
export class MerchantBackendService {
  private path: string = '/catalog/mgmt/v1/merchants';

  constructor(private backendApi: BackendApiService) {
  }

  getPage(page: number, size: number, lang: string): Observable<MerchantPage> {
    return this.backendApi.get(this.path, {
      'page': String(page),
      'size': String(size),
      'sort': 'name'
    }, lang);
  }


  get(id: string, lang: string): Observable<Merchant> {
    return this.backendApi.get(this.path + '/' + id, {}, lang);
  }

  deleteOne(id): Observable<any> {
    return this.backendApi.delete(this.path + '/' + id);
  }

  save(merchantBackend: Merchant, lang: string): Observable<Merchant> {
    if (merchantBackend.id) {
      return this.update(merchantBackend, lang);
    } else {
      return this.create(merchantBackend, lang);
    }
  }

  create(merchantBackend: Merchant, lang: string): Observable<Merchant> {
    return this.backendApi.post(this.path, merchantBackend, {}, lang);
  }

  update(merchantBackend: Merchant, lang: string): Observable<Merchant> {
    return this.backendApi.put(this.path + '/' + merchantBackend.id, merchantBackend, {}, lang);
  }
}
