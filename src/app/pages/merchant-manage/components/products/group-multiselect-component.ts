/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Output, Input, EventEmitter } from "@angular/core";
import { GroupService } from "../../../../core/services/groups/group.service";


@Component({
  selector: 'am-group-multi-select',
  template: `
  <ng-select  [multiple]="true"
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
export class GroupMultiSelectComponent {
  public items:Array<string> = [];

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

  constructor( private groupService: GroupService) {

  }

  ngOnInit(){
    this.getGroups('en')
  }

  getGroups(lang: string){
    this.groupService.getList(lang)
      .subscribe(
        groups => {
          console.log('groups', groups);
          this.items = groups.content
            .map(group => group.name);
        }
      )
  }
}
