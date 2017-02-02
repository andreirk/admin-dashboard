/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BackendApiService } from '../../../core/services/backend-api.service';
import { Merchant } from '../../../commons/model/merchant';
import { MerchantBackendService } from '../../../core/services/merchants/merchant-backend.service';

@Component({
  selector: 'am-merchant-card',
  providers: [
    BackendApiService,
    MerchantBackendService
  ],
  template: `
<div class="col-sm-10">
  <div class="card">
    <div class="card-block">
      <h5 class="card-title">{{merchant.name}}</h5>
      <p class="card-text">{{merchant.description}}</p>
      <a class="btn btn-primary" [routerLink]="[merchant.id, 'general']" routerLinkActive="active">Edit</a>
      <a class="btn btn-primary" (click)="deleteMerchant(merchant.id)">Delete</a>
    </div>
  </div>
</div>
`
})
export class MerchantCardComponent {
  @Input() merchant: Merchant = new Merchant();
  @Output() onDelete = new EventEmitter();
  private lang: string = 'en';

  constructor(
    private router: Router,
    private merchantService: MerchantBackendService) {
  }

  deleteMerchant(merchantId) {
    this.merchantService.deleteOne(merchantId).subscribe(
      res => this.onDelete.emit({value : merchantId})
    );
  }
}

