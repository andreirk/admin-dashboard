/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CategoryService } from "../../../../core/services/categories/category.service";


@Component({
  selector: 'am-category-select',
  template: `

  <ng-select  
              [allowClear]="true"
              [items]="items"
              (data)="refreshValue($event)"
              (selected)="selected($event)"
              (removed)="removed($event)"
              (typed)="typed($event)"
             >
  </ng-select>

`
})
export class CategorySelectComponent {

  @Input() value:any = {};
  @Output() valueChange = new EventEmitter();

  public items:Array<string> = [];

  public selected(value:any):void {
    console.log('Selected value is: ', value);
    this.value = value;
    this.valueChange.emit(this.value)
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

  constructor(private categoryService: CategoryService,) {

  }

  ngOnInit(){
    this.getCategories('en')
  }

  getCategories(lang: string){
    this.categoryService.getCategories(lang)
      .subscribe(
        categories => {
          console.log('categories', categories);
          this.items = categories.content
            .map(category => category.name);
        }
      )
  }
}
