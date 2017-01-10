import {Component, OnInit, EventEmitter} from "@angular/core";
import {Output, Input} from "@angular/core/src/metadata/directives";
import {OrderService} from "../../../core/services/orders/order.service";
import {Order} from "../../../commons/model/order";
import {OrderAction, OrderStatus} from "../../../shared/types";

@Component({
  selector: 'am-order-action-select',
  styleUrls: ['./style'],
  templateUrl: `
        <div class="dropdown">
          <button>Order Actions</button>
          <ul class="dropdown-menu">
            <li *ngFor="let action of orderActions"><a (click)="onActionSelected($event)">{{action}}</a></li>
          </ul>
        </div>

    `
})
export class OrderActionSelectComponent implements OnInit {
  @Input() order: Order = new Order();
  public orderActions : OrderAction[];

  @Output() orderActionEvent = new EventEmitter();

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    if (this.order) {
      this.fillOrderActions();
    }
  }
  ngOnChanges() {
    if (this.order) {
      this.fillOrderActions();
    }
  }

  fillOrderActions() {
    const vm = this;
    vm.orderActions = [];

    switch (vm.order.status) {
      case OrderStatus.ACCEPTED:
        vm.orderActions.push(OrderAction.COMPLETE);
        vm.orderActions.push(OrderAction.TO_SUPPORT);
        break;
      case OrderStatus.TO_SUPPORT:
        vm.orderActions.push(OrderAction.CANCEL);
        break;
      default:
        vm.orderActions.push(OrderAction.TO_SUPPORT);
        break;
    }
  }

  onActionSelected(event){
    let ev = {
      action: event.target.text
    }
    this.orderActionEvent.emit(ev);
  }

}

export class OrderActionEvent {
  constructor(public action: OrderAction) {
  }
}
