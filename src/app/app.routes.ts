import { Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { BlankComponent } from './layout/blank/blank.component';

export const routes: Routes = [
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
    path: '',
    component: BlankComponent,
    // canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
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
      {
        path: 'reports',title:'Reports',
        loadComponent: () =>
          import('./components/reports/reports.component').then(
            (c) => c.ReportsComponent
          ),
      },
      {
        path: 'charts',title:'Charts',
        loadComponent: () =>
          import('./components/charts/charts.component').then(
            (c) => c.ChartsComponent
          ),
      },
      {
        path: 'comparison',title:'Comparison',
        loadComponent: () =>
          import('./components/comparison/comparison.component').then(
            (c) => c.ComparisonComponent
          ),
      },
      {
        path: 'details/:id',title:'Details',
        loadComponent: () =>
          import('./components/details/details.component').then(
            (c) => c.DetailsComponent
          ),
      },
      {
        path: 'orderdetails/:id',title:'Order Details',
        loadComponent: () =>
          import('./components/orderdetails/orderdetails.component').then(
            (c) => c.OrderdetailsComponent
          ),
      },
      {
        path: 'chatbot',title:'Chatbot',
        loadComponent: () =>
          import('./components/chatbot/chatbot.component').then(
            (c) => c.ChatbotComponent
          ),
      },
      {
        path: 'codeSystem',title:'Code System',
        loadComponent: () =>
          import('./components/code-system/code-system.component').then(
            (c) => c.CodeSystemComponent
          ),
      },
      {
        path: 'excelSheet',title:'Excel Sheet',
        loadComponent: () =>
          import('./components/excel-sheet/excel-sheet.component').then(
            (c) => c.ExcelSheetComponent
          ),
      },
      {
        path: 'addProduct',title:'AddP roduct',
        loadComponent: () =>
          import('./components/add-product/add-product.component').then(
            (c) => c.AddProductComponent
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
