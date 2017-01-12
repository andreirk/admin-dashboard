/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BackendApiService } from '../../../core/services/backend-api.service';
import { GroupService } from '../../../core/services/groups/group.service';
import { Group } from '../../../commons/model/group';

@Component({
  selector: 'am-group-card',
  providers: [
    BackendApiService,
    GroupService
  ],
  template: `
<div class="col-sm-10">
  <div class="card card-block">
    <img class="card-img-top col-xs-4 col-sm-2" [src]="group.imageUrl | amImageResize"  [hidden]="!group.imageUrl">
    <h5 class="card-title">{{group.name}}</h5>
    <p class="card-text">{{group.description}}</p>
    <a class="btn btn-primary" [routerLink]="[group.id]" routerLinkActive="active">Edit</a>
    <a class="btn btn-primary" (click)="deleteGroup(group.id)">Delete</a>
  </div>
</div>`
})
export class GroupCardComponent {
  @Input() group: Group;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  constructor(
    private groupService: GroupService
  ) { }

  deleteGroup(id: string) {
    this.groupService.deleteOne(id).subscribe(() => this.onDelete.emit({id: id}));
  }
}

