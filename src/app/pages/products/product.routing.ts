import { Routes, RouterModule }  from '@angular/router';
import { ProductListComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  }
];

export const routing = RouterModule.forChild(routes);