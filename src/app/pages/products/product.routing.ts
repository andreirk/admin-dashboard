import { Routes, RouterModule }  from '@angular/router';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  }
];

export const routing = RouterModule.forChild(routes);