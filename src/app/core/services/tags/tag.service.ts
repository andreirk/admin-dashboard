/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { BackendApiService } from '../backend-api.service';
import { Observable } from 'rxjs';
import { Page } from '../../../commons/model/page';
import { Tag } from '../../../commons/model/tag';


@Injectable()
export class TagService {
  private path: string = '/catalog/mgmt/v1/tags';

  constructor(private backendApi: BackendApiService) {
  }

  getOne(id: string, lang: string) {
    return this.backendApi.get(this.path + '/' + id, {}, lang);
  }

  getPage(page: number, size: number, lang: string): Observable<Page<Tag>> {
    return this.backendApi.get(this.path, {
      'page': String(page),
      'size': String(size)
    }, lang);
  }

  getList(lang: string): Observable<Page<Tag>> {
    return this.backendApi.get(this.path, {}, lang);
  }

  deleteOne(id: string): Observable<any> {
    return this.backendApi.delete(this.path + '/' + id);
  }

  save(tag: Tag, lang: string): Observable<Tag> {
    if (tag.id) {
      return this.update(tag, lang);
    } else {
      return this.create(tag, lang);
    }
  }

  private update(tag: Tag, lang: string): Observable<Tag> {
    return this.backendApi.put(this.path + '/' + tag.id, tag, {}, lang);
  }

  private create(tag: Tag, lang: string): Observable<Tag> {
    return this.backendApi.post(this.path, tag, {}, lang);
  }
}
