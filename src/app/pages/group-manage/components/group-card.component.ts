/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../../../commons/model/group';

@Component({
  selector: 'am-group-card',
  template: `
<div class="col-sm-10">
  <div class="card">
    <div class="card-block">
      <div class="d-flex">
        <div class="col-xs-3 col-sm-2" [hidden]="!group.imageUrl">
          <img class="w-100" [src]="group.imageUrl | amImageResize">
        </div>
        <div class="w-100">
          <h5 class="card-title">{{group.name}}</h5>
          <p class="card-text">{{group.description}}</p>
          <a class="btn btn-primary" [routerLink]="[group.id]" routerLinkActive="active">Edit</a>
          <a class="btn btn-primary" (click)="deleteGroup(group.id)">Delete</a>
        </div>
      </div>
    </div>
  </div>
</div>`
})
export class GroupCardComponent {
  @Input() group: Group;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  deleteGroup(id: string) {
    this.onDelete.emit({id: id});
  }
}

