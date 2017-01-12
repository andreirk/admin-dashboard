import { Routes, RouterModule }  from '@angular/router';
import {ProductDetailComponent} from "./components/product-details.component";
import {ProductListComponent} from "./components/product-list.component";


const routes: Routes = [
  {
    path: '',
    component:   ProductListComponent,
    children: [
       { path: ':id', component: ProductDetailComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
