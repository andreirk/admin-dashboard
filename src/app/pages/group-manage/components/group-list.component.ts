/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, ViewChild } from '@angular/core';
import { GroupService } from '../../../core/services/groups/group.service';
import { GroupListService } from '../../../core/services/groups/group-list.service';
import { ViewList } from '../../../commons/model/view-list';
import { Group } from '../../../commons/model/group';
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm.component';
import { ProductService } from '../../../core/services/products/products-service';
import { Currency } from '../../../shared/types';

@Component({
  selector: 'am-group-list',
  template: `
<div class="column">
  <div class="col-sm-3 card-block"> 
    <a class="btn btn-primary align-bottom" [routerLink]="['new']"
      routerLinkActive="active">New Group</a>
  </div>
  <div>
   <am-group-card *ngFor="let group of groups.content;"
          [group]="group"
          (onDelete)="showDeleteGroupModal($event)"></am-group-card>
  </div>
  <div class="col-sm-3">
    <button (click)="loadMoreGroups()" class="btn btn-secondary" 
        [hidden]="groups.content.length == groups.total">Show more</button>
  </div>
  <am-modal-confirm [message]="alertTitle" (answer)="onDeleteConfirm($event)"></am-modal-confirm>
</div>`
})
export class GroupListComponent {
  private groups: ViewList<Group> = new ViewList<Group>();
  private lang: string = 'en';
  private pagesize = 10;
  private alertTitle = 'All products will be deassigned, do you want to delete group?';
  private currentId: string;

  @ViewChild(ModalConfirmComponent)
  public readonly modal: ModalConfirmComponent;

  constructor(private groupService: GroupService,
              private groupListService: GroupListService,
              private productService: ProductService) {
    this.loadMoreGroups();
  }

  loadMoreGroups() {
    const vm = this;
    this.groupListService.loadMore(vm.groups, vm.pagesize, vm.lang)
      .subscribe(groupList => {
        vm.groups = groupList;
      });
  }

  showDeleteGroupModal(event) {
    const vm = this;
    vm.currentId = event.id;
    vm.productService.getPage(0, 1,'en', Currency.SAR, { 'group-id': vm.currentId }).subscribe(page => {
      if (page.total > 0) {
        vm.alertTitle = page.total + ' product' + ((page.total > 1) ? 's' : '')
            + ' will be deassigned, do you want to delete group?';
        vm.modal.show();
      } else {
        vm.deleteGroup();
      }
    })
  }

  onDeleteConfirm(event) {
    if (event === true) this.deleteGroup();
    else this.modal.hide();
  }

  deleteGroup() {
    this.groupService.deleteOne(this.currentId).subscribe(() =>
      this.groups = this.groupListService.deleteOne(this.groups, this.currentId));
      this.modal.hide();
  }
}
