/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit } from "@angular/core";
import { BackendApiService } from "../../../../core/services/backend-api.service";
import { Pos } from "../../../../commons/model/pos";
import { MerchantBackendService } from "../../../../core/services/merchants/merchant-backend.service";
import { PosService } from "../../../../core/services/pos/pos.service";
import { ActivatedRoute } from "@angular/router";
import { WorkTimeService } from "../../../../core/services/work-times/work-time.service";

@Component({
  selector: 'am-pos-list',
  providers: [
    BackendApiService,
    MerchantBackendService,
    PosService,
    WorkTimeService
  ],
  template: `
  <div class="column">
     <div class="col-sm-3"> 
      <a class="btn btn-primary align-bottom" [routerLink]="['new']"
          routerLinkActive="active">New POS</a>
     </div>
     <div>
       <am-pos-card *ngFor="let pos of posList;"
              [pos]="pos"
              [lang]="lang"
              (onDelete)="deletePos($event)"></am-pos-card>
     </div>
   </div>
`
})

export class PosListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private merchantService: MerchantBackendService, private posService: PosService) {
  }

  private merchantId: string;
  private posList: Pos[] = [];
  private lang: string = 'en';

  ngOnInit() {
    const vm = this;

    vm.route.parent.params.subscribe(params => {
      if (params['merchantId']) {
        vm.merchantId = params['merchantId'];
        this.loadMerchantsPosList();
      }
    });

  }

  loadMerchantsPosList() {
    const vm = this;
    console.log(this.merchantId);
    if (this.merchantId) {
      vm.merchantService.getMerchantsPos(vm.merchantId, vm.lang)
        .subscribe(posList => {
          vm.posList = posList;
        })

    }
  }

  deletePos(event) {
    this.posList = this.posList.filter(pos => pos.id != event.value);

  }
}
