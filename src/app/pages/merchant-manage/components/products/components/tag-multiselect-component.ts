/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Output, Input, EventEmitter } from "@angular/core";
import { TagService } from "../../../../../core/services/tags/tag.service";


@Component({
  selector: 'am-tag-multi-select',
  template: `
  <ng-select  [multiple]="true"
              [allowClear]="true"
              [items]="items"
              [active]="preSelectedTags"   
              (selected)="selected($event)"
              (removed)="removed($event)"
              (data)="onChangeFired($event)"

              >
  </ng-select>
`
})
export class TagMultiSelectComponent {

  items:Array<string> = [];
  pageNum: number = 0;
  pageSize: number = 1000;

  @Input() inputValues:any = {};
  @Output() selectTag = new EventEmitter();
  @Output() removeTag = new EventEmitter();
  @Output() changeFired = new EventEmitter();

  preSelectedTags: Array<string> = [];

  public selected(value:any):void {
    this.selectTag.emit(value);
  }

  public removed(value:any):void {
    //console.log('Removed value is: ', value);
    this.removeTag.emit(value);

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
          let preSelectedTags = []
          this.items = tags.content
            .map(tag => {
             return  tag.name
            });

          this.preSelectedTags = this.inputValues;
        }
      )
  }

  onChangeFired(event){
    this.changeFired.emit(event);
  }

  ///////////////////////
}
