/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Routes, RouterModule } from "@angular/router";
import { RootCategoryListComponent } from "./components/root-category-list.component";
import { RootCategoryDetailsComponent } from "./components/root-category-details/root-category-details.component";

const routes: Routes = [
    {
      path: '',
      component: RootCategoryListComponent
    },
    {
      path: ':rootCategoryId',
      component: RootCategoryDetailsComponent
    }
  ];

export const routing = RouterModule.forChild(routes);
