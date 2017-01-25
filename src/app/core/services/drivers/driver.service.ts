/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { BackendApiService } from '../backend-api.service';
import { Observable } from 'rxjs';
import { Driver } from '../../../commons/model/driver/driver';
import { DriverAccount } from '../../../commons/model/driver/driver-account';
import { DriverLocation } from '../../../commons/model/driver/driver-location';
import { Page } from '../../../commons/model/page';
import { DriverProfile } from '../../../commons/model/driver/driver-profile';
import { DriverBalanceRecord } from '../../../commons/model/driver/driver-balance-record';
import { DriverInfo } from '../../../commons/model/driver/driver-info';

@Injectable()
export class DriverService {
  private path: string = '/driver/mgmt/v1';

  constructor(private backendApi: BackendApiService) {
  }

  getAccount(id: number): Observable<DriverAccount> {
    return this.backendApi.get(this.path + '/drivers/' + id, {})
      .map(account => Object.assign(new DriverAccount(), account));
  }

  getProfile(id: number): Observable<Driver> {
    return this.backendApi.get(this.path + '/profiles/' + id, {})
      .map(driver => Object.assign(new Driver(), driver));
  }

  getLocation(id: number): Observable<DriverLocation> {
    return this.backendApi.get(this.path + '/driverlocation/' + id, {})
      .catch((err) => {
        return Observable.of(err.statusText);
      });
  }

  getProfilesPage(page: number, size: number, filterParams: any): Observable<Page<Driver>> {
    return this.backendApi.get(this.path + '/profiles',
      Object.assign({
        'page': String(page),
        'size': String(size),
        'sort': 'lastName,firstName'
      }, filterParams)
    );
  }

  saveDriver(driver: Driver, driverOriginal: Driver): Observable<Driver> {
    const vm = this;
    if (driver.id) {
      return vm.updateDriver(driver, driverOriginal);
    } else {
      let account = <DriverAccount>_.pick(driver, Object.keys(new DriverAccount()));
      return vm.createAccount(account).mergeMap(account => {
        let profile = <DriverProfile>_.pick(driver, Object.keys(new DriverProfile()));
        return vm.updateProfile(account.id, profile);
      });
    }
  }

  private updateDriver(driver: Driver, driverOriginal: Driver): Observable<Driver> {
    const vm = this;
    let account = <DriverAccount>_.pick(driver, Object.keys(new DriverAccount()));
    let accountOriginal = <DriverAccount>_.pick(driverOriginal, Object.keys(new DriverAccount()));
    let profile = <DriverProfile>_.pick(driver, Object.keys(new DriverProfile()));
    let profileOriginal = <DriverProfile>_.pick(driverOriginal, Object.keys(new DriverProfile()));

    let obsAccount: Observable<DriverAccount>;
    if (_.isEqual(account, accountOriginal)) {
      obsAccount = Observable.of(account);
    } else {
      obsAccount = vm.updateAccount(account);
    }

    let obsProfile: Observable<Driver>;
    if (_.isEqual(profile, profileOriginal)) {
      obsProfile = Observable.of(driver);
    } else {
      obsProfile = vm.updateProfile(driver.id, profile);
    }

    return obsAccount.mergeMap(account => {
      return obsProfile;
    });
  }

  private updateAccount(driverAccount: DriverAccount): Observable<DriverAccount> {
    let account: DriverAccount = <DriverAccount>_.pick(driverAccount, Object.keys(new DriverAccount()));
    if (!account.password || account.password === '') {
      delete account.password;
    }

    return this.backendApi.put(this.path + '/drivers/' + driverAccount.id, account, {}, '');
  }

  private updateProfile(driverId: number, driverProfile: DriverProfile): Observable<Driver> {
    return this.backendApi.put(this.path + '/profiles/' + driverId, driverProfile, {}, '');
  }

  private createAccount(driverAccount: DriverAccount): Observable<DriverAccount> {
    let account: DriverAccount = <DriverAccount>_.pick(driverAccount, Object.keys(new DriverAccount()));

    return this.backendApi.post(this.path + '/drivers', account, {}, '');
  }

  getBalanceRecordsPage(page: number, size: number, filterParams: any): Observable<Page<DriverBalanceRecord>> {
    return this.backendApi.get(this.path + '/driver/balance',
      Object.assign({
        'page': String(page),
        'size': String(size)
      }, filterParams)
    );
  }

  getDriverInfoPage(page: number, size: number, filterParams: any): Observable<Page<DriverInfo>> {
    return this.backendApi.get(this.path + '/driverinfo',
      Object.assign({
        'page': String(page),
        'size': String(size),
        'sort': 'lastName,firstName'
      }, filterParams)
    );
  }
}
