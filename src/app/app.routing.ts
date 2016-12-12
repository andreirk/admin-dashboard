import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/product-manage' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
