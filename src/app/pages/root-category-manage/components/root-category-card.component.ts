/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BackendApiService } from '../../../core/services/backend-api.service';
import { RootCategoryService } from '../../../core/services/root-categories/root-category.service';
import { RootCategory } from '../../../commons/model/root-category';

@Component({
  selector: 'am-root-category-card',
  providers: [
    BackendApiService,
    RootCategoryService
  ],
  template: `
<div class="col-sm-10">
  <div class="card card-block">
    <img class="card-img-top col-xs-4 col-sm-2" [src]="rootCategory.imageUrl | amImageResize" [hidden]="!rootCategory.imageUrl">
    <h5 class="card-title">{{rootCategory.name}}</h5>
    <p class="card-text">{{rootCategory.description}}</p>
    <a class="btn btn-primary" [routerLink]="[rootCategory.id]" routerLinkActive="active">Edit</a>
    <a class="btn btn-primary" (click)="deleteRootCategory(rootCategory.id)">Delete</a>
  </div>
</div>`
})
export class RootCategoryCardComponent {
  @Input() rootCategory: RootCategory;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  constructor(
    private rootCategoryService: RootCategoryService
  ) { }

  deleteRootCategory(id: string) {
    this.rootCategoryService.deleteOne(id).subscribe(() => this.onDelete.emit({id: id}));
  }
}
