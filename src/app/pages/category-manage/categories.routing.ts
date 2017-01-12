/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { CategoryComponent } from './components/category.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent
  }
];

export const routing = RouterModule.forChild(routes);
