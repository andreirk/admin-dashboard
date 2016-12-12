import { Routes, RouterModule }  from '@angular/router';
import { ProductManageComponent } from './product-manage.component';
import { ProductListComponent } from './components/product/product-list.component';
import { ProductCardComponent } from './components/product/product-card.component';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
  {
    path: '',
    component:   ProductManageComponent,
    children: [
       { path: 'products', component: ProductListComponent },
       { path: 'catigories', component: CategoryComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);