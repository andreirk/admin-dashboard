/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { BackendApiService } from '../backend-api.service';
import { User } from '../../../commons/model/user';
import { Observable } from 'rxjs';
import { Page } from '../../../commons/model/page';

@Injectable()
export class UserService {
  private path: string = '/user/mgmt/v1/users';

  constructor(private backendApi: BackendApiService) {
  }

  get(id: string): Observable<User> {
    return this.backendApi.get(this.path + '/' + id, {});
  }

  getPage(page: number, size: number, pattern: string): Observable<Page<User>> {
    return this.backendApi.get(this.path,
      Object.assign({
        'page': String(page),
        'size': String(size),
        'pattern': pattern
      }));
  }

}
