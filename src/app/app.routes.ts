import { Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { BlankComponent } from './layout/blank/blank.component';

export const routes: Routes = [
    {
    path: '',
    component: BlankComponent,
    // canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'dashboard',title:'Dashboard',
        loadComponent: () =>
          import('./components/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'products',title:'All Products',
        loadComponent: () =>
          import('./components/products/products.component').then(
            (c) => c.ProductsComponent
          ),
      },
      {
        path: 'favorites',title:'Favorites',
        loadComponent: () =>
          import('./components/favorits/favorits.component').then(
            (c) => c.FavoritsComponent
          ),
      },
      {
        path: 'orderListes',title:'Order Listes',
        loadComponent: () =>
          import('./components/order-list/order-list.component').then(
            (c) => c.OrderListComponent
          ),
      },
      {
        path: 'productStock',title:'Product Stock',
        loadComponent: () =>
          import('./components/product-stock/product-stock.component').then(
            (c) => c.ProductStockComponent
          ),
      },
      {
        path: 'settings',title:'Settings',
        loadComponent: () =>
          import('./components/settings/settings.component').then(
            (c) => c.SettingsComponent
          ),
      },
      {
        path: 'pricing',title:'Pricing',
        loadComponent: () =>
          import('./components/pricing/pricing.component').then(
            (c) => c.PricingComponent
          ),
      },
    ],
  },
  {
    path: '',
    component: AuthComponent,
    // canActivate: [lodeGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',title:'Login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'forget',title:'Forget Password',
        loadComponent: () =>
          import('./components/forget-password/forget-password.component').then(
            (c) => c.ForgetPasswordComponent
          ),
      },
    ],
  },
  {
    path: '**',title:'Not Found',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
