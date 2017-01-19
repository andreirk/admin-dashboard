/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Output, Input, EventEmitter } from "@angular/core";
import { TagService } from "../../../../core/services/tags/tag.service";


@Component({
  selector: 'am-tag-multi-select',
  template: `
  <ng-select  [multiple]="true"
              [allowClear]="true"
              [items]="items"
              [active]="selectedItems"
              (data)="refreshValue($event)"
              (selected)="selected($event)"
              (removed)="removed($event)"
              (typed)="typed($event)"
              >
  </ng-select>
`
})
export class TagMultiSelectComponent {
  @Input() selectedItems: Array<string> = ['Peselect1', 'preselect2'];
  public items:Array<string> = [];
  public pageNum: number = 0;
  public pageSize: number = 1000;
  private value:any = {};


  public selected(value:any):void {
    console.log('Selected value is: ', value);
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

  constructor( private tagService: TagService) {

  }

  ngOnInit(){
    this.getTags(this.pageNum, this.pageSize, 'en')
  }

  getTags(pageNum, pageSize, lang: string){
    this.tagService.getPage(pageNum, pageSize, lang)
      .subscribe(
        tags => {
          console.log('tags', tags);
          this.items = tags.content
            .map(tag => tag.name);
        }
      )
  }
}
