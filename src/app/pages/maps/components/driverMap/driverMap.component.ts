
import { Component } from '@angular/core';
import { DriverMapService } from './driverMap.service';

import {Observable} from 'rxjs/Rx';

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

let carTypeIconsMap = new Map()

@Component({
  selector: '',
  template: require('./driverMap.html'),
  styles: [require('./driverMap.scss')],
})
export class DriverMapComponent {

  constructor(private driverLocationSrvs: DriverMapService) {}

  subscription: any;
  drivers: driver[] = [];

  private icon: string = '/assets/icon/car20.png';
  //label = '<h1>Label</h1>'
  private zoom: number = 10;

  // center of Er-Riad
  private lat: number = 24.70;
  private lng: number = 46.71;

  ngOnInit(){
    this.loadLocations();
  }

  loadLocations() {
    
    this.subscription = this.driverLocationSrvs.getLocationsByInterval(3500)
      .subscribe(
        data => {
          for (let driver of data) {
            driver.icon = this.icon;
          }
          this.drivers = data
        }
      )
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
    if (zoomNum <= 10) {
      this.icon = '/assets/icon/car' + '16' + '.png'
    }
    if (zoomNum === 11) {
      this.icon = '/assets/icon/car' + '20' + '.png'
    }
    if (zoomNum >= 12) {
      this.icon = '/assets/icon/car' + '24' + '.png'
    }

    for (let driver of this.drivers) {
      driver.icon = this.icon;
    }
    //console.log('drivers', this.drivers)
    this.zoom = zoomNum;
  }

  stopLoading() {
    this.subscription.unsubscribe()
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  // drivers: driver[] = [{
  //   lat: 24.69,
  //   lon: 46.72,
  //   driverId: 21,
  //   capacity: "CAR",
  //   alive: true,
  //   heading: 20,
  //   icon: this.icon
  // }, {
  //   lat: 24.71,
  //   lon: 46.69,
  //   driverId: 21,
  //   capacity: "SCOOTER",
  //   alive: true,
  //   heading: 20,
  //   icon: this.icon
  // }, {
  //   lat: 24.72,
  //   lon: 46.72,
  //   driverId: 21,
  //   capacity: "TRUCK",
  //   alive: true,
  //   heading: 20,
  //   icon: this.icon
  // }]

}

interface driver {
  lat: number;
  lon: number;
  driverId: number;
  capacity: string;
  alive: boolean;
  heading: number;
  icon ? : string;
}


