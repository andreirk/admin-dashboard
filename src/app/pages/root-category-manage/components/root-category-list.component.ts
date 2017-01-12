/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component } from '@angular/core';
import { RootCategoryService } from '../../../core/services/root-categories/root-category.service';
import { BackendApiService } from '../../../core/services/backend-api.service';
import { RootCategory } from '../../../commons/model/root-category';

@Component({
  selector: 'am-root-category-list',
  providers: [
    BackendApiService,
    RootCategoryService
  ],
  template: `
  <div class="column">
     <div class="col-sm-3 card-block"> 
      <a class="btn btn-primary align-bottom" [routerLink]="['new']" 
          routerLinkActive="active">New Root Category</a>
     </div>
     <div>
       <am-root-category-card *ngFor="let rootCategory of rootCategories;"
              [rootCategory]="rootCategory"
              (onDelete)="onDelete($event)"></am-root-category-card>
     </div>     
   </div>
`
})
export class RootCategoryListComponent {
  private lang: string = 'en';
  private rootCategories: RootCategory[] = [];

  constructor(private rootCategoryService: RootCategoryService) {
    this.loadRootCategories();
  }

  loadRootCategories() {
    this.rootCategoryService.getList(this.lang).subscribe(rootCategories => {
      this.rootCategories = rootCategories;
    })
  }

  onDelete(event) {
    this.rootCategories = this.rootCategories.filter(rootCategory => rootCategory.id != event.id);
  }
}
