/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import {User} from "../../../commons/model/user";
import {Observable} from "rxjs";
import {UserService} from "../../../core/services/users/user.service";
import {Injectable} from "@angular/core";

@Injectable()
export class UserCacheService {
  private users: Map<string, Observable<User>> = new Map();

  constructor(private userService: UserService) {
  }

  getUser(userId: string): Observable<User> {
    const vm = this;
    if (!vm.users.get(userId)) {
      vm.users.set(userId, vm.userService.get(userId)
        .publishReplay(1)
        .refCount());
    }
    return vm.users.get(userId);
  }
}
