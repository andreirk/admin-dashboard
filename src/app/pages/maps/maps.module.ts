import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { routing }       from './maps.routing';
import { Maps } from './maps.component';
//import { BubbleMaps } from './components/bubbleMaps/bubbleMaps.component';
// import { GoogleMaps } from './components/googleMaps/googleMaps.component';
import { DriverMapComponent } from './components/driverMap/driverMap.component';
//import { LeafletMaps } from './components/leafletMaps/leafletMaps.component';
//import { LineMaps } from './components/lineMaps/lineMaps.component';
//import { BubbleMapsService } from './components/bubbleMaps/bubbleMaps.service';
//import { LineMapsService } from './components/lineMaps/lineMaps.service';
import { DriverMapService } from './components/driverMap/driverMap.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,  
    NgaModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC52zimpd1o93V2W4_hDENNdFkI4nJrGo8'
    }),
    routing
  ],
  declarations: [
    Maps,
   // BubbleMaps,
    // GoogleMaps,
    DriverMapComponent
    //LeafletMaps,
   // LineMaps
  ],
  providers: [
   // BubbleMapsService,
   // LineMapsService
   DriverMapService
  ]
})
export default class MapsModule {}
