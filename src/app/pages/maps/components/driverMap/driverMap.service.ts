import { Injectable } from '@angular/core';
import { BackendApiService  } from './../../../../services/backend-api.service';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';

@Injectable()
export class DriverMapService {
    private path = '/driver/mgmt/v1/driverlocation';
    headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Basic YWRtaW46MDAwMA=='
  }); 
    options = {
        headers : this.headers
    }
    constructor(private api: BackendApiService, private http: Http){

    }
    
    counter() {
    return Observable
        .interval(2000)
        .flatMap(() => {
            return  this.http.get(this.path, this.options)
        });
}

    getDriverLocations(){
        return this.http.get(this.path, this.options)
    }


}