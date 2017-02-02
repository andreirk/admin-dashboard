import { Routes, RouterModule }  from '@angular/router';
import {ProductFormComponent} from "../merchant-manage/components/products/product-form.component";
import {ProductListContainerComponent} from "../merchant-manage/components/products/product-list-container.component";
import { ProductSectionComponent } from "./product-section.component";


const routes: Routes = [
  {
    path: '',
    component:   ProductSectionComponent,
    children: [
       { path: ':id', component: ProductFormComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
