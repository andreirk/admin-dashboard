/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { BackendApiService } from '../../../services/backend-api.service';
import { Observable } from 'rxjs';
import { RootCategory } from '../model/root-category';

@Injectable()
export class RootCategoryService {
  private path: string = '/catalog/mgmt/v2/rootcategories';

  constructor(private backendApi: BackendApiService) {
  }

  get(id: string, lang: string) {
    return this.backendApi.get(this.path + '/' + id, {}, lang);
  }

  getList(lang: string): Observable<RootCategory[]> {
    return this.backendApi.get(this.path, {}, lang);
  }

  deleteOne(id: string): Observable<any> {
    return this.backendApi.delete(this.path + '/' + id);
  }

  save(rootCategory: RootCategory, lang: string): Observable<RootCategory> {
    if (rootCategory.id) {
      return this.update(rootCategory, lang);
    } else {
      return this.create(rootCategory, lang);
    }
  }

  private update(rootCategory: RootCategory, lang: string): Observable<RootCategory> {
    return this.backendApi.put(this.path + '/' + rootCategory.id, rootCategory, {}, lang);
  }

  private create(rootCategory: RootCategory, lang: string): Observable<RootCategory> {
    return this.backendApi.post(this.path, rootCategory, {}, lang);
  }
}
