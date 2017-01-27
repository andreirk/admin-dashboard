/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Pos } from "../../../../commons/model/pos";
import { MerchantBackendService } from "../../../../core/services/merchants/merchant-backend.service";
import { PosService } from "../../../../core/services/pos/pos.service";
import { ModalConfirmComponent } from "../../../../shared/components/modal-confirm.component";
import { ViewChild } from "@angular/core/src/metadata/di";

@Component({
  selector: 'am-pos-card',
  providers: [],
  template: `
<div class="col-sm-10">
  <div class="card">
    <div class="card-block">
      <h5 class="card-title">{{pos.name}}</h5>
      <p class="card-text">{{pos.address.country + ', '}}{{pos.address.city + ', '}}{{pos.address.addressLine1}}</p>
      <a class="btn btn-primary" [routerLink]="[pos.id]" routerLinkActive="active">Edit</a>
      <a class="btn btn-primary pull-right" (click)="modal.show()">Delete</a>
    </div>
  </div>
  <am-modal-confirm #deleteConfirmModal [message]="confirmDeleteMessage" (answer)="onDeleteConfirm($event)"></am-modal-confirm>
</div>
`
})
export class PosCardComponent {
  @Input() pos: Pos;
  @Input() lang: string = 'en';
  @Output() onDelete = new EventEmitter();

  private confirmDeleteMessage: string = 'Delete this POS?';

  @ViewChild('deleteConfirmModal')
  public readonly modal: ModalConfirmComponent;

  constructor(private router: Router, private merchantservice: MerchantBackendService, private posService: PosService) {
  }

  deletePos(posId: string) {
    this.posService.deletePos(posId).subscribe(res => this.onDelete.emit({value: posId}));
  }

  onDeleteConfirm(event) {
    if (event === true) this.deletePos(this.pos.id);
    else this.modal.hide();
  }

}
