/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { BackendApiService } from "../../../../core/services/backend-api.service";
import { Pos } from "../../../../commons/model/pos";
import { MerchantBackendService } from "../../../../core/services/merchants/merchant-backend.service";
import { PosService } from "../../../../core/services/pos/pos.service";
import { WorkTimeService } from "../../../../core/services/work-times/work-time.service";
import { ModalComponent } from "../../../../shared/components/modal.component";
import { ViewChild } from "@angular/core/src/metadata/di";

@Component({
  selector: 'am-pos-card',
  providers: [],
  template: `
<div class="col-sm-10">
  <div class="card card-block">
    <h5 class="card-title">{{pos.name}}</h5>
    <p class="card-text">{{pos.address.country + ', '}}{{pos.address.city + ', '}}{{pos.address.addressLine1}}</p>
    <a class="btn btn-primary" [routerLink]="[pos.id]" routerLinkActive="active">Edit</a>
    <a class="btn btn-primary pull-right" (click)="modal.show()">Delete</a>
  </div>
  <am-app-modal>
    <div class="app-modal-body">
      <h5 class="modal-title" id="deleteModalLabel">Delete this POS?</h5>
    </div>
    <div class="app-modal-footer">
      <button type="button" class="btn btn-primary" (click)="deletePos(pos.id)">Confirm</button>
      <button type="button" class="btn btn-secondary" (click)="modal.hide()">Cancel</button>
    </div>
  </am-app-modal>
</div>
`
})
export class PosCardComponent {
  @Input() pos: Pos;
  @Input() lang: string = 'en';
  @Output() onDelete = new EventEmitter();

  @ViewChild(ModalComponent)
  public readonly modal: ModalComponent;

  constructor(private router: Router, private merchantservice: MerchantBackendService, private posService: PosService) {
  }

  deletePos(posId: string) {
    this.posService.deletePos(posId).subscribe(res => this.onDelete.emit({value: posId}));
  }

}
