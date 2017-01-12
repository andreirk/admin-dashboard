/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { MerchantBackendService } from './merchant-backend.service';
import { Observable } from 'rxjs';
import { Merchant } from '../../../commons/model/merchant';
import { ViewListService } from '../view-list.service';
import { Page } from '../../../commons/model/page';

@Injectable()
export class MerchantListService extends ViewListService<Merchant> {
  constructor(private merchantBackendService: MerchantBackendService) {
    super();
  }

  getPage(page: number, size: number, lang: string): Observable<Page<Merchant>> {
    return this.merchantBackendService.getPage(page, size, lang);
  }
}
