/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'am-merchant-sections',
  template: `
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link" routerLink="general" routerLinkActive="active">General</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" routerLink="pos" routerLinkActive="active">Points of sales</a>
    </li>
  </ul>
  <div class="card-block">
    <router-outlet></router-outlet>
  </div>
`
})

export class MerchantSectionsComponent {
  constructor () {
  }
}
