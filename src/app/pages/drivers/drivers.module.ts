import { NgModule } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { routing } from './drivers.routing';
import { DriverContainerComponent } from './drivers.container.component';
import { DriverMapComponent } from './components/driverMap/driverMap.component';
import { DriverMapApiService } from './components/driverMap/driverMap.service';
import { CustomMapDirective } from './components/driverMap/driverMap.directive';
import { DriverTableComponent } from './components/driver-table/driver-table.component';
import { DriverRowComponent } from './components/driver-row.component';
import { DriverFilteringService } from './services/driver-filtering.service';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';
import { SharedModule } from '../../shared/shared.module';
import { MaxPaymentAmountsComponent } from './components/max-payment-amounts.component';
import { DriverBalanceHistoryTableComponent } from './components/balance-history-table/balance-history-table.component';
import { DriverTabsComponent } from './components/driver-tabs.component';
import { BalanceRecordListService } from './services/balance-record-list.service';
import { BalanceRecordRowComponent } from './components/balance-record-row.component';
import { BalanceRecordFilteringService } from './services/balance-record-filtering.service';
import { BalanceRecordTypeMultiselectComponent } from './components/balance-record-type-multiselect.component';
import { DriverInfoListService } from './services/driver-info-list.service';
import { DriverStatusService } from './services/driver-status.service';

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
    DriverBalanceHistoryTableComponent,
    DriverTabsComponent,
    BalanceRecordRowComponent,
    BalanceRecordTypeMultiselectComponent,
    CustomMapDirective
  ],
  providers: [
    DriverMapApiService,
    DriverInfoListService,
    DriverFilteringService,
    BalanceRecordListService,
    BalanceRecordFilteringService,
    DriverStatusService
  ]
})
export default class MapsModule {}
