/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component } from '@angular/core';
import { MerchantListService } from '../../../core/services/merchants/merchant-list.service';
import { MerchantBackendService } from '../../../core/services/merchants/merchant-backend.service';
import { BackendApiService } from '../../../core/services/backend-api.service';
import { ViewList } from '../../../commons/model/view-list';
import { Merchant } from '../../../commons/model/merchant';

@Component({
  selector: 'am-merchant-list',
  providers: [
    BackendApiService,
    MerchantBackendService,
    MerchantListService
  ],
  template: ` 
  <div class="column">
     <div class="col-sm-3 card-block"> 
      <a class="btn btn-primary align-bottom" [routerLink]="['new']"
          routerLinkActive="active">New merchant</a>
     </div>
     <div>
       <am-merchant-card *ngFor="let merchant of merchants.content;"
              [merchant]="merchant"
              (onDelete)="deleteMerchant($event)"></am-merchant-card>
     </div>
     <div class="col-sm-3">
      <button (click)="loadMoreMerchants()" class="btn btn-secondary" 
          [hidden]="merchants.content.length == merchants.total">Show more</button>
     </div>
   </div>
`
})
export class MerchantListComponent {
  private merchants: ViewList<Merchant> = new ViewList<Merchant>();
  private lang: string = 'en';
  private pagesize = 5;

  constructor(private merchantListService: MerchantListService) {
    this.loadMoreMerchants();
  }

  loadMoreMerchants() {
    const vm = this;
    vm.merchantListService.loadMore(vm.merchants, vm.pagesize, vm.lang)
      .subscribe(merchantList => {
        vm.merchants = merchantList;
      });
  }

  deleteMerchant(event) {
    this.merchants = this.merchantListService.deleteOne(this.merchants, event.value);
  }
}
