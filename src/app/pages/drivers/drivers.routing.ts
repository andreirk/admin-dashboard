import { Routes, RouterModule }  from '@angular/router';

import { DriverContainerComponent } from './drivers.container.component';
import { DriverMapComponent } from './components/driverMap/driverMap.component';
import { DriverTableComponent } from './components/driver-table/driver-table.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: DriverTableComponent
  },
  {
    path: 'driver_map_locations',
    component: DriverMapComponent
  }

];

export const routing = RouterModule.forChild(routes);
