import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail.component').then(m => m.ProductDetailComponent),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart.component').then(m => m.CartComponent),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout.component').then(m => m.CheckoutComponent),
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories.component').then(m => m.CategoriesComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
