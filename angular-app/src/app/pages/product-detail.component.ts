import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { addToCart } from '../store/cart.actions';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <button 
          routerLink="/" 
          class="flex items-center text-accent mb-6 hover:text-blue-700 transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </button>

        <div *ngIf="loading" class="bg-white rounded-lg shadow-lg p-8 animate-pulse">
          <div class="grid md:grid-cols-2 gap-8">
            <div class="h-96 bg-gray-300 rounded"></div>
            <div class="space-y-4">
              <div class="h-8 bg-gray-300 rounded"></div>
              <div class="h-6 bg-gray-300 rounded w-3/4"></div>
              <div class="h-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        <div *ngIf="!loading && product" class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="grid md:grid-cols-2 gap-8 p-8">
            <div class="relative">
              <img 
                [src]="product.image" 
                [alt]="product.name"
                class="w-full h-96 object-cover rounded-lg"
              />
              <div *ngIf="!product.inStock" 
                   class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span class="text-white font-bold text-2xl">Out of Stock</span>
              </div>
            </div>

            <div class="flex flex-col justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-2">{{ product.brand }}</p>
                <h1 class="text-4xl font-bold text-primary mb-4">{{ product.name }}</h1>
                
                <div *ngIf="product.rating" class="flex items-center mb-6">
                  <div class="flex text-yellow-400 mr-2">
                    <svg *ngFor="let star of [1,2,3,4,5]" class="w-5 h-5" [class.text-gray-300]="star > (product.rating || 0)" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span class="text-gray-600">{{ product.rating }} ({{ product.reviews }} reviews)</span>
                </div>

                <p class="text-gray-700 mb-6 leading-relaxed">{{ product.description }}</p>

                <div class="mb-6">
                  <span class="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {{ product.category }}
                  </span>
                </div>
              </div>

              <div>
                <div class="text-4xl font-bold text-accent mb-6">
                  \${{ product.price.toFixed(2) }}
                </div>

                <button 
                  (click)="addProductToCart()"
                  [disabled]="!product.inStock || added"
                  [class.opacity-50]="!product.inStock || added"
                  [class.cursor-not-allowed]="!product.inStock || added"
                  class="w-full bg-accent text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <svg *ngIf="!added" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <svg *ngIf="added" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ added ? 'Added to Cart' : 'Add to Cart' }}</span>
                </button>

                <a 
                  *ngIf="added"
                  routerLink="/cart"
                  class="block w-full text-center mt-4 bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                  View Cart
                </a>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="!loading && !product" class="text-center py-12">
          <p class="text-xl text-gray-500">Product not found</p>
          <a routerLink="/" class="text-accent hover:text-blue-700 mt-4 inline-block">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  `,
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading: boolean = true;
  added: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = Number(params['id']);
      this.loadProduct(id);
    });
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product || null;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
      },
    });
  }

  addProductToCart(): void {
    if (this.product && this.product.inStock && !this.added) {
      this.store.dispatch(addToCart({ product: this.product }));
      this.added = true;
      
      setTimeout(() => {
        this.added = false;
      }, 2000);
    }
  }
}
