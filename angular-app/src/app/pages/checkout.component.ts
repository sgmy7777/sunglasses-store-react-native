import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../models/product.model';
import { selectCartItems, selectCartTotal } from '../store/cart.selectors';
import { clearCart } from '../store/cart.actions';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4 max-w-4xl">
        <h1 class="text-4xl font-bold text-primary mb-8">Checkout</h1>

        <div *ngIf="(cartItems$ | async) as items">
          <div *ngIf="items.length === 0" class="bg-white rounded-lg shadow-md p-12 text-center">
            <p class="text-xl text-gray-500 mb-4">Your cart is empty</p>
            <a routerLink="/" class="text-accent hover:text-blue-700">Return to Home</a>
          </div>

          <div *ngIf="items.length > 0" class="grid md:grid-cols-3 gap-8">
            <div class="md:col-span-2">
              <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-2xl font-semibold text-primary mb-6">Shipping Information</h2>
                <form class="space-y-4">
                  <div class="grid md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input 
                        type="text" 
                        [(ngModel)]="shippingInfo.firstName"
                        name="firstName"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input 
                        type="text" 
                        [(ngModel)]="shippingInfo.lastName"
                        name="lastName"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      [(ngModel)]="shippingInfo.email"
                      name="email"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input 
                      type="text" 
                      [(ngModel)]="shippingInfo.address"
                      name="address"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>
                  <div class="grid md:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input 
                        type="text" 
                        [(ngModel)]="shippingInfo.city"
                        name="city"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input 
                        type="text" 
                        [(ngModel)]="shippingInfo.state"
                        name="state"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                      <input 
                        type="text" 
                        [(ngModel)]="shippingInfo.zipCode"
                        name="zipCode"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-semibold text-primary mb-6">Payment Method</h2>
                <div class="space-y-3">
                  <label 
                    *ngFor="let method of paymentMethods"
                    class="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors"
                    [class.border-accent]="paymentMethod === method"
                    [class.bg-blue-50]="paymentMethod === method"
                    [class.border-gray-300]="paymentMethod !== method">
                    <input 
                      type="radio" 
                      [value]="method"
                      [(ngModel)]="paymentMethod"
                      name="paymentMethod"
                      class="mr-3"
                    />
                    <span class="text-lg">{{ method }}</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="md:col-span-1">
              <div class="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 class="text-2xl font-bold text-primary mb-6">Order Summary</h2>
                <div class="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  <div *ngFor="let item of items" class="flex justify-between text-sm">
                    <span class="text-gray-600">{{ item.product.name }} x{{ item.quantity }}</span>
                    <span class="font-semibold">\${{ (item.product.price * item.quantity).toFixed(2) }}</span>
                  </div>
                </div>
                <div class="border-t pt-4 space-y-2 mb-6">
                  <div class="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>\${{ (cartTotal$ | async)?.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span class="text-green-600">FREE</span>
                  </div>
                  <div class="flex justify-between text-xl font-bold text-primary">
                    <span>Total</span>
                    <span>\${{ (cartTotal$ | async)?.toFixed(2) }}</span>
                  </div>
                </div>
                <button 
                  (click)="placeOrder()"
                  [disabled]="!isFormValid()"
                  [class.opacity-50]="!isFormValid()"
                  [class.cursor-not-allowed]="!isFormValid()"
                  class="w-full bg-accent text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="orderPlaced" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-primary mb-2">Order Placed Successfully!</h2>
            <p class="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>
            <button 
              (click)="goToHome()"
              class="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CheckoutComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  
  paymentMethods = ['Credit Card', 'PayPal', 'Apple Pay', 'Google Pay'];
  paymentMethod = 'Credit Card';
  
  shippingInfo = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  };

  orderPlaced = false;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartTotal);
  }

  ngOnInit(): void {}

  isFormValid(): boolean {
    return (
      this.shippingInfo.firstName.trim() !== '' &&
      this.shippingInfo.lastName.trim() !== '' &&
      this.shippingInfo.email.trim() !== '' &&
      this.shippingInfo.address.trim() !== '' &&
      this.shippingInfo.city.trim() !== '' &&
      this.shippingInfo.state.trim() !== '' &&
      this.shippingInfo.zipCode.trim() !== '' &&
      this.paymentMethod !== ''
    );
  }

  placeOrder(): void {
    if (this.isFormValid()) {
      this.orderPlaced = true;
      this.store.dispatch(clearCart());
    }
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
