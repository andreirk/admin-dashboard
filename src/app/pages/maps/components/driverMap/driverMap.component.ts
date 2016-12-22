
import { Component } from '@angular/core';
import { DriverMapService } from './driverMap.service';

import {Observable} from 'rxjs/Rx';


@Component({
  selector: '',
  template: require('./driverMap.html'),
  styles: [require('./driverMap.scss')],
})
export class DriverMapComponent {

  constructor(private driverLocationSrvs: DriverMapService){
    
  }

  loadLocations(){

    this.driverLocationSrvs.counter().subscribe(
      data => {
          console.log(data);
          this.drivers = data.json()
      }
    )
      
    // .subscribe(resp => {
    //   console.log('!!! resp',resp)
    //   this.drivers = resp
    // })
  }  


  lat: number = 24.70;
  lng: number = 46.71;
  zoom: number = 10;
  icon = '/assets/icon/car.png';

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  drivers: driver[] = [
	  {
      lat: 24.69,
      lon: 46.72,
      driverId: 21,
      capacity: "CAR",
      alive: true,
      heading: 20,
      icon: this.icon 
	  },
	  {
      lat: 24.71,
      lon: 46.69,
      driverId: 21,
      capacity: "CAR",
      alive: true,
      heading: 20,
      icon: "/assets/icon/car.png"
    }, 
	  {
      lat: 24.72,
      lon: 46.72,
      driverId: 21,
      capacity: "CAR",
      alive: true,
      heading: 20,
      icon: "/assets/icon/car.png"
	  }
  ]

}

interface driver {
	lat: number;
	lon: number;
	driverId: number;
	capacity: string;
	alive: boolean;
	heading: number;
  icon: string;
}

