import { Injectable } from '@angular/core';
import { BackendApiService  } from './../../../../services/backend-api.service';

import {Observable} from 'rxjs/Rx';

@Injectable()
export class DriverMapService {
  private path = '/driver/mgmt/v1/driverlocation';

  constructor(private api: BackendApiService) {

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


}
