import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartItemCount } from '../store/cart.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-8">
            <a routerLink="/" class="text-2xl font-bold text-primary">
              👓 SunShop
            </a>
            <nav class="hidden md:flex space-x-6">
              <a routerLink="/" routerLinkActive="text-accent" [routerLinkActiveOptions]="{exact: true}" 
                 class="text-secondary hover:text-accent transition-colors">
                Home
              </a>
              <a routerLink="/categories" routerLinkActive="text-accent" 
                 class="text-secondary hover:text-accent transition-colors">
                Categories
              </a>
            </nav>
          </div>
          <div class="flex items-center space-x-4">
            <a routerLink="/cart" class="relative text-secondary hover:text-accent transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span *ngIf="(cartItemCount$ | async) as count" 
                    class="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {{ count }}
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  cartItemCount$: Observable<number>;

  constructor(private store: Store) {
    this.cartItemCount$ = this.store.select(selectCartItemCount);
  }
}
