/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserCacheService } from '../services/user-cache.service';
import { DriverCacheService } from '../services/driver-cache.service';
import { DriverProfile } from '../../../commons/model/driver-profile';
@Component({
  selector: '[am-driver-row]',
  template: `
<td>
  <button type="button" class="btn btn-xs btn-default" [routerLink]="[driver.id]" routerLinkActive="active" >
    <span class="glyphicon glyphicon-pencil"><i class="fa fa-pencil" aria-hidden="true"></i> </span>
  </button>
</td>
<td>{{driver.id}}</td>
<td>{{driver.firstName + ' ' + driver.lastName}}</td>
<td>{{driver.capacity + ': ' + driver.carBrand}}</td>
<td>{{driver.phone}}</td>
<td>{{'rating'}}</td>
<td>{{'status'}}</td>`
})
export class DriverRowComponent implements OnInit {
  @Input() driver: DriverProfile;
  @Output() onDelete = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    const vm = this;
//TODO process rating and status
  }
}

