/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TotalCosts, Order } from '../../../commons/model/order';
import { UserCacheService } from '../services/user-cache.service';
import { DriverCacheService } from '../services/driver-cache.service';
@Component({
  selector: '[am-order-row]',
  template: `
<td>
  <button type="button" class="btn btn-xs btn-default" [routerLink]="[order.id]" routerLinkActive="active" >
    <span class="glyphicon glyphicon-pencil"><i class="fa fa-pencil" aria-hidden="true"></i> </span>
  </button>
</td>
<td>{{order.id | amSuffix:6}}</td>
<td>{{order | amOrderStatus}}</td>
<td>{{order.creationDate*1000 | date:'short'}}</td>
<td>{{(order.requiredDeliveryDate || 0)*1000 | date:'short' | amDefaultValue:'n/a':(order.creationDate > (order.requiredDeliveryDate || 0))}}</td>
<td>{{userName}}</td>
<td>{{driverName | amDefaultValue:'n/a'}}</td>
<td>{{order.pickUp.address | amAddress}}</td>
<td>{{order.dropOff.address | amAddress}}</td>
<td>{{sumCost(order.totalCosts)}}</td>`
})
export class OrderRowComponent implements OnInit {
  @Input() order: Order;
  @Output() onDelete = new EventEmitter();

  private userName: string;
  private driverName: string;

  constructor(private userCacheService: UserCacheService,
        private driverCacheService: DriverCacheService) {
  }

  ngOnInit() {
    const vm = this;
    vm.userCacheService.getUser(vm.order.userId)
      .subscribe(user => {
        vm.userName = user.firstName + ' ' + user.lastName;
      });
    if (vm.order.driverId) {
      vm.driverCacheService.getDriver(vm.order.driverId)
        .subscribe(driver => {
          vm.driverName = driver.firstName + ' ' + driver.lastName;
        });
    }
//TODO process custom merchant address line
  }

  sumCost(totalCosts: TotalCosts) {
    let sum: number = 0;
    Object.keys(totalCosts).forEach(key => { sum += totalCosts[key]; });
    return sum;
  }
}
