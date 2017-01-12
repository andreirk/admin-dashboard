import { Routes, RouterModule } from '@angular/router';
import { ProductManageComponent } from './product-manage.component';
import { ProductListComponent } from './components/product/product-list.component';

const routes: Routes = [
  {
    path: '',
    component:   ProductManageComponent,
    children: [
       { path: 'products', component: ProductListComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
