import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { routing }       from './drivers.routing';
import { DriverContainerComponent } from './drivers.container.component';

import { DriverMapComponent } from './components/driverMap/driverMap.component';

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
    DriverContainerComponent,
    DriverMapComponent

  ],
  providers: [
   DriverMapService,
  ]
})
export default class MapsModule {}
