/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'am-merchant-sections',
  template: `
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link" routerLink="general" routerLinkActive="active">General</a>
    </li>
    <li *ngIf="merchantId !== 'new'" class="nav-item">
      <a class="nav-link" routerLink="pos" routerLinkActive="active">Points of sales</a>
    </li>
    <li *ngIf="merchantId !== 'new'" class="nav-item">
      <a  class="nav-link" routerLink="products" routerLinkActive="active">Products</a>
    </li>
    <li *ngIf="merchantId !== 'new'" class="nav-item">
      <a class="nav-link" routerLink="product-options" routerLinkActive="active">Product options</a>
    </li>
  </ul>
  <div class="card-block">
    <router-outlet></router-outlet>
  </div>
`
})

export class MerchantSectionsComponent {
  private merchantId: string;

  private paramsSubscr: Subscription;

  constructor (private route: ActivatedRoute) {
  }

  ngOnInit() {
    const vm = this;
    vm.paramsSubscr = vm.route.params.subscribe(params => {
      this.merchantId = params['merchantId'];
    });
  }

  ngOnDestroy() {
    this.paramsSubscr.unsubscribe();
  }
}
