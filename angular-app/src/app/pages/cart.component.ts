import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../models/product.model';
import { selectCartItems, selectCartTotal } from '../store/cart.selectors';
import { removeFromCart, updateQuantity } from '../store/cart.actions';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-primary mb-8">Shopping Cart</h1>

        <div *ngIf="(cartItems$ | async) as items">
          <div *ngIf="items.length === 0" class="bg-white rounded-lg shadow-md p-12 text-center">
            <svg class="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 class="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
            <p class="text-gray-500 mb-6">Add some sunglasses to get started!</p>
            <a routerLink="/" class="inline-block bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Continue Shopping
            </a>
          </div>

          <div *ngIf="items.length > 0" class="grid lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-4">
              <div *ngFor="let item of items" class="bg-white rounded-lg shadow-md p-6 flex items-center space-x-6">
                <img 
                  [src]="item.product.image" 
                  [alt]="item.product.name"
                  class="w-32 h-32 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <a [routerLink]="['/product', item.product.id]" class="text-xl font-semibold text-primary hover:text-accent transition-colors">
                    {{ item.product.name }}
                  </a>
                  <p class="text-gray-500 mt-1">{{ item.product.brand }}</p>
                  <p class="text-lg font-bold text-accent mt-2">
                    \${{ item.product.price.toFixed(2) }}
                  </p>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="flex items-center border rounded-lg">
                    <button 
                      (click)="decrementQuantity(item.product.id, item.quantity)"
                      class="px-3 py-2 hover:bg-gray-100 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span class="px-4 py-2 font-semibold">{{ item.quantity }}</span>
                    <button 
                      (click)="incrementQuantity(item.product.id, item.quantity)"
                      class="px-3 py-2 hover:bg-gray-100 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                  <button 
                    (click)="removeItem(item.product.id)"
                    class="text-red-500 hover:text-red-700 transition-colors p-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="lg:col-span-1">
              <div class="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 class="text-2xl font-bold text-primary mb-6">Order Summary</h2>
                <div class="space-y-4 mb-6">
                  <div class="flex justify-between text-gray-600">
                    <span>Subtotal ({{ items.length }} items)</span>
                    <span>\${{ (cartTotal$ | async)?.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span class="text-green-600">FREE</span>
                  </div>
                  <div class="border-t pt-4 flex justify-between text-xl font-bold text-primary">
                    <span>Total</span>
                    <span>\${{ (cartTotal$ | async)?.toFixed(2) }}</span>
                  </div>
                </div>
                <a 
                  routerLink="/checkout"
                  class="block w-full bg-accent text-white text-center py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Proceed to Checkout
                </a>
                <a 
                  routerLink="/"
                  class="block w-full text-center mt-4 text-accent hover:text-blue-700 transition-colors">
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;

  constructor(private store: Store) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartTotal);
  }

  ngOnInit(): void {}

  incrementQuantity(productId: number, currentQuantity: number): void {
    this.store.dispatch(updateQuantity({ productId, quantity: currentQuantity + 1 }));
  }

  decrementQuantity(productId: number, currentQuantity: number): void {
    this.store.dispatch(updateQuantity({ productId, quantity: currentQuantity - 1 }));
  }

  removeItem(productId: number): void {
    this.store.dispatch(removeFromCart({ productId }));
  }
}
