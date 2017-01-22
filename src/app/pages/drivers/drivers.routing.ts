import { Routes, RouterModule }  from '@angular/router';

import { DriverContainerComponent } from './drivers.container.component';
import { DriverMapComponent } from './components/driverMap/driverMap.component';
import { DriverTableComponent } from './components/driver-table/driver-table.component';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';

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
    component: DriverDetailsComponent
  }
];

export const routing = RouterModule.forChild(routes);
