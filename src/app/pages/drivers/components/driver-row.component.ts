/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserCacheService } from '../services/user-cache.service';
import { DriverCacheService } from '../services/driver-cache.service';
import { Driver } from '../../../commons/model/driver/driver';
import { DriverInfo } from '../../../commons/model/driver/driver-info';
import { DriverLocation } from '../../../commons/model/driver/driver-location';
import { DriverStatusService } from '../services/driver-status.service';
import { driverStatusColorsMap, vehicleTypeIconMap } from '../model/driver-const';
import { DriverStatus } from '../../../shared/types';
@Component({
  selector: '[am-driver-row]',
  styleUrls: ['./style'],
  template: `
<td>
  <button type="button" class="btn btn-xs btn-default" [routerLink]="[driverInfo.profile.id, 'general']" routerLinkActive="active" >
    <span class="glyphicon glyphicon-pencil"><i class="fa fa-pencil" aria-hidden="true"></i> </span>
  </button>
</td>
<td>{{driverInfo.profile.id}}</td>
<td>{{driverInfo.profile.firstName + ' ' + driverInfo.profile.lastName}}</td>
<td>{{driverInfo.profile.phone}}</td>
<td><i class="fa" [style.color]="getColor(driverInfo.location)">{{getIcon()}}</i>&nbsp;&nbsp;&nbsp;{{driverInfo.profile.carBrand}}</td>
<td [style.color]="getColor(driverInfo.location)">{{getStatus(driverInfo.location)}}</td>
<td *ngIf="driverInfo.profile.rating.count == 0">-</td> 
<td *ngIf="driverInfo.profile.rating.count != 0">
  <am-rating-component [rating]="driverInfo.profile.rating.value / driverInfo.profile.rating.count" [size]="1.2"></am-rating-component>
</td>`
})
export class DriverRowComponent implements OnInit {
  @Input() driverInfo: DriverInfo;
  @Output() onDelete = new EventEmitter();

  constructor() {
  }

  getStatus(driverLocation: DriverLocation): string {
    return String(DriverStatusService.getStatus(driverLocation)).replace('_', ' ');
  }

  getColor(driverLocation: DriverLocation): string {
    return driverStatusColorsMap.get(DriverStatusService.getStatus(driverLocation));
  }

  getIcon() {
    return vehicleTypeIconMap.get(this.driverInfo.profile.capacity);
  }

  ngOnInit() {
    const vm = this;
//TODO process rating and status
  }
}

