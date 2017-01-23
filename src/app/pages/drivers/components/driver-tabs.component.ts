/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'am-driver-tabs',
  template: `
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link" routerLink="general" routerLinkActive="active">General</a>
    </li>
    <li *ngIf="driverId !== 'new'" class="nav-item">
      <a class="nav-link" routerLink="balance" routerLinkActive="active">Balance history</a>
    </li>
  </ul>
  <div class="card-block">
    <router-outlet></router-outlet>
  </div>
`
})

export class DriverTabsComponent implements OnInit, OnDestroy {
  private driverId: string;

  private paramsSubscr: Subscription;

  constructor (private route: ActivatedRoute) {
  }

  ngOnInit() {
    const vm = this;
    vm.paramsSubscr = vm.route.params.subscribe(params => {
      this.driverId = params['driverId'];
    });
  }

  ngOnDestroy() {
    this.paramsSubscr.unsubscribe();
  }

}
