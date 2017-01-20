import { NgModule } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { routing } from './drivers.routing';
import { DriverContainerComponent } from './drivers.container.component';
import { DriverMapComponent } from './components/driverMap/driverMap.component';
import { DriverMapApiService } from './components/driverMap/driverMap.service';
import { CustomMapDirective } from './components/driverMap/driverMap.directive';
import { DriverTableComponent } from './components/driver-table/driver-table.component';
import { DriverRowComponent } from './components/driver-row.component';
import { DriverListService } from './services/driver-list.service';
import { DriverFilteringService } from './services/driver-filtering.service';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';
import { SharedModule } from '../../shared/shared.module';
import { MaxPaymentAmountsComponent } from './components/max-payment-amounts.component';

@NgModule({
  imports: [
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC52zimpd1o93V2W4_hDENNdFkI4nJrGo8'
    }),
    routing
  ],
  declarations: [
    DriverContainerComponent,
    DriverMapComponent,
    DriverTableComponent,
    DriverRowComponent,
    DriverDetailsComponent,
    MaxPaymentAmountsComponent,
    CustomMapDirective
  ],
  providers: [
    DriverMapApiService,
    DriverListService,
    DriverFilteringService
  ]
})
export default class MapsModule {}
