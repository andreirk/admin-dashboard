/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { BackendApiService } from '../backend-api.service';
import { Observable } from 'rxjs';
import { Group } from '../../../commons/model/group';
import { Page } from '../../../commons/model/page';

@Injectable()
export class GroupService {
  private path: string = '/catalog/v1/groups';

  constructor(private backendApi: BackendApiService) {
  }

  get(id: string, lang: string) {
    return this.backendApi.get(this.path + '/' + id, {}, lang);
  }

  getPage(page: number, size: number, lang: string): Observable<Page<Group>> {
    return this.backendApi.get(this.path, {
      'page': String(page),
      'size': String(size)
    }, lang);
  }

  getList(lang: string): Observable<Page<Group>> {
    return this.backendApi.get(this.path, {}, lang);
  }

  deleteOne(id: string): Observable<any> {
    return this.backendApi.delete(this.path + '/' + id);
  }

  save(group: Group, lang: string): Observable<Group> {
    if (group.id) {
      return this.update(group, lang);
    } else {
      return this.create(group, lang);
    }
  }

  private update(group: Group, lang: string): Observable<Group> {
    return this.backendApi.put(this.path + '/' + group.id, group, {}, lang);
  }

  private create(group: Group, lang: string): Observable<Group> {
    return this.backendApi.post(this.path, group, {}, lang);
  }
}
