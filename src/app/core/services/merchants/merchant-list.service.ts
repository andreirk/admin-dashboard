/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { MerchantBackendService } from './merchant-backend.service';
import { Observable } from 'rxjs';
import { MerchantList } from '../../../commons/model/merchant-list';

@Injectable()
export class MerchantListService {
  constructor(private merchantBackendService: MerchantBackendService) { }

  update(merchantList: MerchantList, page: number, size: number, lang: string): Observable<MerchantList> {
    return this.merchantBackendService.getPage(page, size, lang)
      .map(merchantBackendPage => {
          merchantList.total = merchantBackendPage.total;
          for (let i = 0; i < merchantBackendPage.content.length; ++i) {
            merchantList.content[i + page * size] = merchantBackendPage.content[i];
          }
          return merchantList;
        }
      );
  }

  loadMore(merchantList: MerchantList, size: number, lang: string): Observable<MerchantList> {
    const vm = this;
    let page =  merchantList.content.length / size;
    return vm.update(merchantList, page, size, lang);
  }

  deleteOne(merchantList: MerchantList, merchantId: string): MerchantList {
    let oldLength = merchantList.content.length;
    merchantList.content = merchantList.content.filter(merchant => merchant.id !== merchantId);
    merchantList.total -= oldLength - merchantList.content.length;
    return merchantList;
  }


}
