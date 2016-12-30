/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../core/services/orders/order.service';
import { Order } from '../../../../commons/model/order';
import { UserCacheService } from '../../services/user-cache.service';
import { User } from '../../../../commons/model/user';
import { Driver } from '../../../../commons/model/driver';
import { DriverService } from '../../../../core/services/drivers/driver.service';
import { DriverLocation } from '../../../../commons/model/driver-location';
import {OrderActionEvent} from "../order-action-select.component";
import {OrderAction} from "../../../../shared/types";

@Component({
  selector: 'am-order-details',
  providers: [
    OrderService
  ],
  template: require('./order-details.component.html')
})
export class OrderDetailsComponent implements OnInit {
  private orderId;
  private order: Order = new Order();

  private user: User = new User();
  private driver: Driver = new Driver();
  private driverLocation: DriverLocation = new DriverLocation();

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private userCacheService: UserCacheService,
              private driverService: DriverService) {
  }

  ngOnInit() {
    const vm = this;
    vm.orderId = vm.route.snapshot.params['orderId'];
    vm.orderService.get(vm.orderId).subscribe(order => {
      vm.order = order;

      vm.userCacheService.getUser(vm.order.userId)
        .subscribe(user => {
          vm.user = user;
        });
      if (vm.order.driverId) {
        vm.driverService.get(vm.order.driverId)
          .subscribe(driver => {
            vm.driver = driver;
        });
        vm.driverService.getLocation(vm.order.driverId)
          .subscribe(location => {
            vm.driverLocation = location;
          })
      }
    });
  }

  completeOrder(orderId) {
    this.orderService.completeOrder(orderId).subscribe(
      res => this.ngOnInit()
    );
  }

  toSupportOrder(orderId) {
    this.orderService.toSupportOrder(orderId, 'Admin').subscribe(
      res => this.ngOnInit()
    );
  }

  cancelOrder(orderId) {
    this.orderService.cancelOrder(orderId).subscribe(
      res => this.ngOnInit()
    );
  }



  processOrderAction(event: OrderActionEvent) {
    switch (event.action) {
      case OrderAction.COMPLETE:
        this.completeOrder(this.order.id);
        break;
      case OrderAction.TO_SUPPORT:
        this.toSupportOrder(this.order.id);
        break;
      case OrderAction.CANCEL:
        this.cancelOrder(this.order.id);
        break;
      default:
        break;
    }
  }

  onChangeLanguage(event) {

  }

}
