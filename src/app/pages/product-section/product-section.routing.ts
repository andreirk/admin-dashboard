import { Routes, RouterModule }  from '@angular/router';
import {ProductDetailComponent} from "../merchant-manage/components/products/product-details.component";
import {ProductListComponent} from "../merchant-manage/components/products/product-list.component";
import { ProductSectionComponent } from "./product-section.component";


const routes: Routes = [
  {
    path: '',
    component:   ProductSectionComponent,
    children: [
       { path: ':id', component: ProductDetailComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
