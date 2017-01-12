/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component } from '@angular/core';
import { GroupService } from '../../../core/services/groups/group.service';
import { GroupListService } from '../../../core/services/groups/group-list.service';
import { ViewList } from '../../../commons/model/view-list';
import { Group } from '../../../commons/model/group';

@Component({
  selector: 'am-group-list',
  providers: [
    GroupService
  ],
  template: `
<div class="column">
 <div class="col-sm-3"> 
  <a class="btn btn-primary align-bottom" [routerLink]="['new']"
      routerLinkActive="active">New Group</a>
 </div>
 <div>
   <am-group-card *ngFor="let group of groups.content;"
          [group]="group"
          (onDelete)="deleteGroup($event)"></am-group-card>
 </div>
 <div class="col-sm-3">
    <button (click)="loadMoreGroups()" class="btn btn-secondary" 
        [hidden]="groups.content.length == groups.total">Show more</button>
  </div>
</div>`
})
export class GroupListComponent {
  private groups: ViewList<Group> = new ViewList<Group>();
  private lang: string = 'en';
  private pagesize = 10;

  constructor(private groupListService: GroupListService) {
    this.loadMoreGroups();
  }

  loadMoreGroups() {
    const vm = this;
    this.groupListService.loadMore(vm.groups, vm.pagesize, vm.lang)
      .subscribe(groupList => {
        vm.groups = groupList;
      });
  }

  deleteGroup(event) {
    this.groups = this.groupListService.deleteOne(this.groups, event.id);
  }
}
