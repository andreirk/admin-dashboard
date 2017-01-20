import { Injectable } from '@angular/core';
import { BackendApiService  } from '../../../../core/services/backend-api.service';
import { DriverService } from '../../../../core/services/drivers/driver.service'

import { Observable } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';
import { Driver } from '../../../../commons/model/driver/driver';

@Injectable()
export class DriverMapApiService {
  private path = '/driver/mgmt/v1/driverlocation';

  constructor(
    private api: BackendApiService,
    private profileApi : DriverService
  ) {
  }

  private driverMarkerClicked = new Subject<string>();

  // Observable string streams

  mapMarkerClick$ = this.driverMarkerClicked.asObservable();

  // Service message commands
  confirmMarkerClick(msg: any) {

    this.driverMarkerClicked.next(msg);
  }

  getLocationsByInterval(interval) {

    return Observable
      .interval(interval)
      .flatMap(() => {
        return this.api.get(this.path, {}, 'en')
      });
  }

  getDriverLocations() {
    return this.api.get(this.path, {}, 'en')
  }

  getDriver(id): Observable<Driver> {
    return this.profileApi.getProfile(id)
  }

}


