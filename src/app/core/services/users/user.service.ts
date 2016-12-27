/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { BackendApiService } from '../backend-api.service';
import { User } from '../../../commons/model/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  private path: string = '/user/mgmt/v1/users';

  constructor(private backendApi: BackendApiService) {
  }

  get(id: string): Observable<User> {
    return this.backendApi.get(this.path + '/' + id, {});
  }

}
