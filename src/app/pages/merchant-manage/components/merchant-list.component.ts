/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import {
  Component
} from '@angular/core';
import { MerchantList } from "../model/merchant-list";
import { MerchantListService } from "../services/merchant-list.service";
import { MerchantBackendService } from "../services/merchant-backend.service";
import { BackendApiService } from "../../../services/backend-api.service";

@Component({
  selector: 'am-merchant-list',
  providers: [
    BackendApiService,
    MerchantBackendService,
    MerchantListService
  ],
  template: ` 
  <div class="column">
     <div class="col-sm-3"> 
      <a class="btn btn-primary align-bottom" [routerLink]="['new']" routerLinkActive="active">New merchant</a>
     </div>
     <div>
       <am-merchant-card *ngFor="let merchant of merchants.content;"
              [merchant]="merchant"
              (onDelete)="deleteMerchant($event)"></am-merchant-card>
     </div>
     <div class="col-sm-3">
      <button (click)="loadMoreMerchants()" class="btn btn-secondary" [hidden]="merchants.content.length == merchants.total">Show more</button>
     </div>
   </div>
`
})
export class MerchantListComponent {
  private merchants: MerchantList = new MerchantList;
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
    this.merchantListService.deleteOne(this.merchants, event.value);
  }
}
