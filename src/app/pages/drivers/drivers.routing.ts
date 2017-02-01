import { Routes, RouterModule } from '@angular/router';
import { DriverMapComponent } from './components/driverMap/driverMap.component';
import { DriverTableComponent } from './components/driver-table/driver-table.component';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';
import { DriverTabsComponent } from './components/driver-tabs/driver-tabs.component';
import { DriverBalanceHistoryTableComponent } from './components/balance-history-table/balance-history-table.component';
import { DriverAddressComponent } from './components/driver-address/driver-address.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CanDeactivateGuard } from '../../core/services/guards/can-deactivate-guard.service';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: DriverTableComponent
  },
  {
    path: 'driver_map_locations',
    component: DriverMapComponent
  },
  {
    path: ':driverId',
    component: DriverTabsComponent,
    canDeactivate: [CanDeactivateGuard],
    children: [
      {
        path: 'general',
        component: DriverDetailsComponent
      },
      {
        path: 'address',
        component: DriverAddressComponent
      },
      {
        path: 'car',
        component: CarDetailsComponent
      },
      {
        path: 'balance',
        component: DriverBalanceHistoryTableComponent
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
