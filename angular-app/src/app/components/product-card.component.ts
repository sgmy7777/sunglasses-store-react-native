import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <a [routerLink]="['/product', product.id]" class="block">
        <div class="relative h-64 bg-gray-200">
          <img 
            [src]="product.image" 
            [alt]="product.name"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <div *ngIf="!product.inStock" 
               class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span class="text-white font-bold text-lg">Out of Stock</span>
          </div>
        </div>
        <div class="p-4">
          <p class="text-sm text-gray-500 mb-1">{{ product.brand }}</p>
          <h3 class="text-lg font-semibold text-primary mb-2 line-clamp-2">
            {{ product.name }}
          </h3>
          <div class="flex items-center justify-between">
            <span class="text-xl font-bold text-accent">
              \${{ product.price.toFixed(2) }}
            </span>
            <div *ngIf="product.rating" class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {{ product.rating }} ({{ product.reviews }})
            </div>
          </div>
        </div>
      </a>
    </div>
  `,
})
export class ProductCardComponent {
  @Input() product!: Product;
}
