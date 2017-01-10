import { Directive } from '@angular/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';

import * as GOOGLE_MAPS_TYPES from 'angular2-google-maps/core/services/google-maps-types';
import { DriverMapApiService } from './driverMap.service'
import {DriverProfile} from "../../../../commons/model/driver-profile";
import {DriverAccount} from "../../../../commons/model/driver-account";
import {DriverOnMap} from "./driverOnMap.model";


@Directive({
  selector: 'custom-directive'
})

export class CustomMapDirective {

  _map: any;
  infoWindowOptions: GOOGLE_MAPS_TYPES.InfoWindowOptions = {};

  constructor ( private gmapsApi: GoogleMapsAPIWrapper,
                private dirverMapSrvc: DriverMapApiService)
    {
        this.gmapsApi.getNativeMap().then(map => {
          this._map = map;
        });

        this.dirverMapSrvc.mapMarkerClick$.subscribe(
          (driverData: any) => {
            let driverMarker: DriverOnMap = driverData.driverMarker;
            let orderId: number = driverMarker.orderId;
            let profile: DriverProfile = driverData.profile;
            let account: DriverAccount = driverData.account;

            let link =  '<a href="#/pages/orders/'+ orderId + '"  >Order link </a>';
            let avatarImg =  profile.avatarUrl ? '<img src="' + profile.avatarUrl + '">' : '';


            this.infoWindowOptions.content =  `
              <div 
                  style="padding: 10px;
                  background-color: #48b5e9;
                  color: white;
                  margin: 1px;

                  border-radius: 2px 2px 0 0;
                  width: 100%;"
                  >
                <style>     
                                 
                  td img{ display: block; margin: 0; width: 35%; max-width: none; }
                </style>
                  
                <div class="iw-container"> 
                  <div class="iw-title">
                    DriverID : ${profile.id}
                  </div>
                  <table>
                    <tr>
                      <td> ${avatarImg} </td>
                      <td></td>            
                    <tr>     <tr>
                      <td>First name </td>
                      <td>${profile.firstName || ''}</td>            
                    <tr>
                      <td>Last Name:</td><td>${profile.lastName || ''}</td>            
                    </tr>                     
                    <tr>
                      <td>carBrand:</td><td>${profile.carBrand || ''}</td>            
                    </tr>
                    <tr>
                      <td>carType:</td><td>${profile.carType || ''}</td>            
                    </tr>
                    <tr>
                      <td>carColor: </td><td>${profile.carColor || ''}</td>            
                    </tr>
                    <tr>
                      <td>carPlateNumber:</td><td>${profile.carPlateNumber || ''}</td>            
                    </tr>                                                                                                                   
                    <tr>
                      <td>email: </td><td>${account.email || ''}</td>            
                    </tr>
                    <tr>
                      <td>Phone: </td><td>${account.phone || ''}</td>

                    </tr>                    
                    <tr>          
                      <td><b>Order:</b></td>
                      <td> ${orderId ? link : 'No order'}  </td>
                    </tr>                  
                    <tr>          

                      <td><b> ${orderId ? 'OrderID :' : 'No order ID'}  </b></td>

                      <td> ${orderId ? orderId : ''}  </td>
                    </tr>                        
                  </table>
                </div>
                  
              </div>`;


            this.gmapsApi.createMarker(
              {
                position: {
                  lat: driverMarker.lat,
                  lng: driverMarker.lon
                },
                visible: false
              }
            ).then(newMarker => {
              this.gmapsApi.createInfoWindow(this.infoWindowOptions)
                .then( infoWin => infoWin.open(this._map, newMarker))
            })
          }
        )
    }


  ngOnInit(){

  }

}

