/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { BackendApiService } from '../backend-api.service';
import { Observable } from 'rxjs';
import { DriverProfile } from '../../../commons/model/driver-profile';
import { DriverAccount } from '../../../commons/model/driver-account';
import { Driver } from '../../../commons/model/driver';
import { DriverLocation } from '../../../commons/model/driver-location';
import { Page } from '../../../commons/model/page';

@Injectable()
export class DriverService {
  private path: string = '/driver/mgmt/v1';

  constructor(private backendApi: BackendApiService) {
  }

  get(id: number): Observable<Driver> {
    const vm = this;
    return Observable.combineLatest(
      vm.getAccount(id),
      vm.getProfile(id),
      (account, profile) => {
        return  <Driver> {
          account: account,
          profile: profile
        };
      }
    );
  }

  getAccount(id: number): Observable<DriverAccount> {
    return this.backendApi.get(this.path + '/drivers/' + id, {});
  }

  getProfile(id: number): Observable<DriverProfile> {
    return this.backendApi.get(this.path + '/profiles/' + id, {});
  }

  getLocation(id: number): Observable<DriverLocation> {
    return this.backendApi.get(this.path + '/driverlocation/' + id, {})
      .catch((err) => {
        return Observable.of(err.statusText);
      });
  }

  getProfilesPage(page: number, size: number, filterParams: any): Observable<Page<DriverProfile>> {
    return this.backendApi.get(this.path + '/profiles',
      Object.assign({
        'page': String(page),
        'size': String(size)
      }, filterParams)
    );
  }

}
