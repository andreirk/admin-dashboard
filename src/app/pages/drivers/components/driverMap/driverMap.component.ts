
import { Component } from '@angular/core';
import { DriverMapApiService } from './driverMap.service';


const vehicleTypeIconMap = new Map([
  ['CAR', '\uf1b9'],
  ['SCOOTER', '\uf21c'],
  ['TRUCK', '\uf0d1'],
])

const vehicleStatusColorsMap = new Map([
  ['ALIVE_WITH_ORDER', '#111D59'], // blue
  ['ALIVE_NOT_ORDER', '#21C53D'],  // green
  ['NOT_ALIVE_WITH_ORDER', '#DA3E18'], // red
])


interface DriverOnMap {
  lat: number;
  lon: number;
  driverId: number;
  capacity: string;
  alive: boolean;
  heading: number;
  icon ? : string;
  orderId ? : number;
}

// interface DriverInfoWindow {
//   lat: number;
//   lon: number;
//   driverId: number;
//   capacity: string;
//   alive: boolean;
//   heading: number;
//   icon ? : string;
//   orderId ? : number;
// }


// get icon url for glyph
function getIcon(glyph, color ? , size = 20) {
  let canvas, ctx;
  canvas = document.createElement('canvas');
  canvas.width =  size + (size * 0.4);
  canvas.height = size + (size * 0.8);
  ctx = canvas.getContext('2d');
  if (color) {
    ctx.fillStyle = color;
  }
  ctx.font = (size * 0.9) + 'px FontAwesome';
  ctx.textBaseline="top";
  ctx.fillText(glyph, 4, 20);
  return canvas.toDataURL();
}


@Component({
  selector: '',
  template: require('./driverMap.html'),
  styles: [require('./driverMap.scss')],
})
export class DriverMapComponent {

  constructor(private driverLocationSrvs: DriverMapApiService) {}

  drivers: DriverOnMap[] = [];
  dirverInfoWindows = [1,2,3,4];

  private subscription: any;
  private zoom: number = 10;

  // center of ER-RIAD
  public lat: number = 24.70;
  public lng: number = 46.71;

  ngOnInit() {
    this.loadLocations();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngAfterViewInit(){

  }

  loadLocations() {
    // initial loading on component init
    this.driverLocationSrvs.getDriverLocations()
      .subscribe(drivers => {
        this.drivers = this.setIcons(drivers);
      });

    // then subscribe to update in interval
    this.subscription = this.driverLocationSrvs.getLocationsByInterval(10000)
      .subscribe(
        drivers => {
          this.drivers = this.setIcons(drivers);
          console.log(this.drivers)
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

  }

  stopLoading() {
    this.subscription.unsubscribe()
  }

  clickedMarker(driverMarker: DriverOnMap, index: number) {
      this.dirverInfoWindows.push(index);

      this.driverLocationSrvs.getDriver(driverMarker.driverId)
        .subscribe( (driverProfile: any) => {
            driverProfile.driverMarker = driverMarker;
            this.driverLocationSrvs.confirmMarkerClick(driverProfile )
          }
        )
  }


  private setIcons(drivers) {
    let driversWithIcons = drivers.map((driver: DriverOnMap) => {
      let color = vehicleStatusColorsMap.get("NOT_ALIVE_WITH_ORDER");

      if (driver.alive && driver.orderId) {
        color = vehicleStatusColorsMap.get("ALIVE_WITH_ORDER")
      } else if (driver.alive && !driver.orderId) {
        color = vehicleStatusColorsMap.get("ALIVE_NOT_ORDER")
      }

      let icon = vehicleTypeIconMap.get(driver.capacity);

      return Object.assign({}, driver, {
        icon: getIcon(icon, color)
      })
    });

    return driversWithIcons;
  }

}

