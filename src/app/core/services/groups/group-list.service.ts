/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { GroupService } from './group.service';
import { Observable } from 'rxjs';
import { Group } from '../../../commons/model/group';
import { ViewListService } from '../view-list.service';
import { Page } from '../../../commons/model/page';

@Injectable()
export class GroupListService extends ViewListService<Group> {
  constructor(private groupService: GroupService) {
    super();
  }

  getPage(page: number, size: number, lang: string): Observable<Page<Group>> {
    return this.groupService.getPage(page, size, lang);
  }
}

