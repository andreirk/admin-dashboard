import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => System.import('./login/login.module')
  },
  {
    path: 'register',
    loadChildren: () => System.import('./register/register.module')
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'product', pathMatch: 'full' },
      // { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
      // { path: 'editors', loadChildren: () => System.import('./editors/editors.module') },
      { path: 'product_manage', loadChildren: () => System.import('./product-manage/product-manage.module') },
      // { path: 'components', loadChildren: () => System.import('./components/components.module') },
      // { path: 'charts', loadChildren: () => System.import('./charts/charts.module') },
      // { path: 'ui', loadChildren: () => System.import('./ui/ui.module') },
      { path: 'forms', loadChildren: () => System.import('./forms/forms.module') },
      // { path: 'tables', loadChildren: () => System.import('./tables/tables.module') },
      // { path: 'maps', loadChildren: () => System.import('./maps/maps.module') },
      { path: 'drivers', loadChildren: () => System.import('./drivers/drivers.module') },
      { path: 'login', loadChildren: () => System.import('./login/login.module') },
      { path: 'merchants',  loadChildren: () => System.import('./merchant-manage/merchant.module') },
      { path: 'root-categories',  loadChildren: () => System.import('./root-category-manage/root-categories.module') },
      { path: 'orders',  loadChildren: () => System.import('./order-manage/order.module') },

    ]
  }
];

export const routing = RouterModule.forChild(routes);
