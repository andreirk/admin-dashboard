/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Routes, RouterModule } from '@angular/router';
import { GroupListComponent } from './components/group-list.component';
import { GroupDetailsComponent } from './components/group-details/group-details.component';

const routes: Routes = [
  {
    path: '',
    component: GroupListComponent
  },
  {
    path: ':groupId',
    component: GroupDetailsComponent
  }
];

export const routing = RouterModule.forChild(routes);

