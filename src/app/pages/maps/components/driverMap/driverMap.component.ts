
import { Component } from '@angular/core';
import { DriverMapService } from './driverMap.service';

import {Observable} from 'rxjs/Rx';


interface driver {
  lat: number;
  lon: number;
  driverId: number;
  capacity: string;
  alive: boolean;
  heading: number;
  icon? : string;
}

// get icon url for glyph
function getIcon(glyph, color?, size = 20) {
    var canvas, ctx;
    canvas = document.createElement('canvas');
    canvas.width = canvas.height = size + (size * 0.4);
    ctx = canvas.getContext('2d');
    if (color) {
      ctx.fillStyle = color;
    }
    ctx.font = size + 'px FontAwesome';
    ctx.fillText(glyph, 0, 16);
    return canvas.toDataURL();
  }

enum VehicleType {
    CAR,
    SCOOTER,
    TRUCK  
  }


@Component({
  selector: '',
  template: require('./driverMap.html'),
  styles: [require('./driverMap.scss')],
})
export class DriverMapComponent {

  constructor(private driverLocationSrvs: DriverMapService) {}

  subscription: any;
  drivers: driver[] = [];

  private icon: string = getIcon('\uf0d1', '#111D59');
  private zoom: number = 10;

  // center of Er-Riad
  private lat: number = 24.70;
  private lng: number = 46.71;

  ngOnInit(){
    this.loadLocations();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  loadLocations() {
    
    this.driverLocationSrvs.getDriverLocations()
    .subscribe( drivers => {
      this.setIcons(drivers)
      this.drivers = drivers
    }
    )
      
    this.subscription = this.driverLocationSrvs.getLocationsByInterval(10000)  
      .subscribe(
        drivers => {
          this.setIcons(drivers)
          drivers.map((obj,index) => {
            this.drivers[index] = obj
          })
          console.log(drivers)
        }
      )
  }

  setIcons(drivers){
  for (let driver of drivers) {
        driver.icon = this.icon;
      }
  }

  mapClicked($event) {
    let coords = {
      lat: $event.coords.lat,
      lng: $event.coords.lng
    };
    console.log(coords)
  }

  onMapZoomChange(zoomNum) {
    console.info('!!! zoom is', zoomNum);
  }

  stopLoading() {
    this.subscription.unsubscribe()
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
}


