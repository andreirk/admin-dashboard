import { Routes, RouterModule } from '@angular/router';
import { ProductManageComponent } from './product-manage.component';
import { ProductListContainerComponent } from './components/product/product-list-container.component';
import { ProductDetailsComponent } from './components/product/product-details.component';

const routes: Routes = [
  {
    path: '',
    component:   ProductManageComponent,
    children: [
       { path: 'products', component: ProductListContainerComponent },
       { path: 'products/:productId', component: ProductDetailsComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
