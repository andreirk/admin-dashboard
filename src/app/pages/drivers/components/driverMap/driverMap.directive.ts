import { Directive } from '@angular/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import * as mapTypes  from 'angular2-google-maps/core/services/google-maps-types';
import { DriverMapApiService } from './driverMap.service'

@Directive({
  selector: 'custom-directive'
})

export class CustomMapDirective {
  constructor (
    private gmapsApi: GoogleMapsAPIWrapper,
    private dirverMapSrvc: DriverMapApiService
    )
    {
        this.gmapsApi.getNativeMap().then(map => {
          this._map = map;

        });

        this.dirverMapSrvc.mapMarkerClick$.subscribe(
          (driverProfile: any) => {
            let driverMarker = driverProfile.driverMarker;
            let orderId: number =  driverMarker.orderId;
            let link = '<a href="/#/pages/orders/'+ orderId + '"  target="_blank" >Order link </a>';
            this.infoWindowOptions.content =  `
              <div 
                  style="padding: 10px;
                  background-color: #48b5e9;
                  color: white;
                  margin: 1px;
                  border-radius: 2px 2px 0 0; ">
                  
                <div class="iw-container"> 
                  <div class="iw-title">
                    DriverID : ${driverProfile.profile.id}
                  </div>
                  <table>
                    <tr>
                      <td>firstName:</td><td>${driverProfile.profile.firstName || ''}</td>            
                    </tr>
                    <tr>
                      <td>lastName:</td><td>${driverProfile.profile.lastName || ''}</td>            
                    </tr>                     
                    <tr>
                      <td>carBrand:</td><td>${driverProfile.profile.carBrand || ''}</td>            
                    </tr>
                    <tr>
                      <td>carType:</td><td>${driverProfile.profile.carType || ''}</td>            
                    </tr>
                    <tr>
                      <td>carColor: </td><td>${driverProfile.profile.carColor || ''}</td>            
                    </tr>
                    <tr>
                      <td>carPlateNumber:</td><td>${driverProfile.profile.carPlateNumber || ''}</td>            
                    </tr>                                                                                                                   
                    <tr>
                      <td>email: </td><td>${driverProfile.account.email || ''}</td>            
                    </tr>
                    <tr>
                      <td>Phone</td><td>${driverProfile.account.phone || ''}</td>
                    </tr>                    
                    <tr>          
                      <td><b>Order:</b></td>
                      <td> ${orderId ? link : 'No order'}  </td>
                    </tr>                  
                    <tr>          
                      <td><b> ${orderId ? 'OrderID' : ''}  :</b></td>
                      <td> ${orderId ? orderId : ''}  </td>
                    </tr>                        
                  </table>
                </div>
                  
              </div>`;

            // this.infoWindowOptions.position.lat = driverMarker.lat
            // this.infoWindowOptions.position.lng = driverMarker.lon

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

  _map: any;

  lat_lng: mapTypes.LatLngLiteral = {
    lat: 24.70,
    lng: 46.71
  };

  infoWindowOptions: mapTypes.InfoWindowOptions = {
    position: this.lat_lng,
    content: 'Hello from directive'
  };

  ngOnInit(){

  }

}

