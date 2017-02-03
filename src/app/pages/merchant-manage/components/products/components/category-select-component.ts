/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CategoryService } from "../../../../../core/services/categories/category.service";


@Component({
  selector: 'am-category-select',
  template: `

  <ng-select  
          [allowClear]="true"
          [items]="items"
          [active]="selectedValue"
          (data)="refreshValue($event)"
          (selected)="selected($event)"
          (removed)="removed($event)"
          (typed)="typed($event)"
          (data)="onChangeFired($event)"
              
          >
  </ng-select>

`
})
export class CategorySelectComponent {

  selectedValue: any;

  @Input()  value: any;
  @Output() valueChange = new EventEmitter();
  @Output() changeFired = new EventEmitter();

  public items:Array<string> = [];

  public selected(value:any):void {
    this.value = value;
    this.valueChange.emit(this.value)
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
      .map(categoriesPage => categoriesPage.content)
      .subscribe(
        categories => {

          // set values to select from
          this.items = categories
            .map(category => {
              return  {id:category.id, text: category.name}
            });

          // set preselected value
          this.selectedValue = categories
            .filter(category => category.id === this.value)
            .map(category => ({id: category.id, text: category.name}))

        }
      )
  }

  onChangeFired(event){
    this.changeFired.emit(event);
  }

  ////////////////
}
