/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Output, Input, EventEmitter } from "@angular/core";
import { GroupService } from "../../../../../core/services/groups/group.service";
import { Group } from '../../../../../commons/model/group';

export interface GroupSelectOption  {
  id: string;
  text: string;
}

@Component({
  selector: 'am-group-multi-select',
  template: `
  <ng-select  [multiple]="true"
              [allowClear]="true"
              [items]="groupsFromBackend"
              [active]="preSelectedGroups"
              (selected)="selected($event)"
              (removed)="removed($event)"
              (data)="onChangeFired($event)"
              >
  </ng-select>
`
})
export class GroupMultiSelectComponent {

  preSelectedGroups: any;

  @Input() inputValues:any;
  @Output() selectGroup = new EventEmitter();
  @Output() removeGroup = new EventEmitter();
  @Output() changeFired = new EventEmitter();


  public groupsFromBackend:GroupSelectOption[] = [];


  constructor( private groupService: GroupService) {

  }

  ngOnInit(){
    this.getGroups('en')
  }

  public selected(value:any):void {
    this.selectGroup.emit(value.id);
  }

  public removed(value:any):void {
    this.removeGroup.emit(value.id);

  }

  getGroups(lang: string){
    let page = 0;
    let size = 1000;
    this.groupService.getPage(page, size, lang)
      .map(groupsPage => groupsPage.content)
      .subscribe(
        groups => {
          this.groupsFromBackend = groups
            .map(group => ({id: group.id, text: group.name}) );

          let tempSelected = []
          this.inputValues.map(value => {
             this.groupsFromBackend.filter(group => group.id === value)
                 .map(item => {
                   tempSelected.push(item);
                 })
          })
          this.preSelectedGroups = tempSelected;

        }
      )
  }

  onChangeFired(event){
    this.changeFired.emit(event);
  }


  //////////////////
}
