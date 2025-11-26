import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { ProductCardComponent } from '../components/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <section class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-5xl font-bold mb-4">
            Discover Your Perfect Sunglasses
          </h1>
          <p class="text-xl mb-8">
            Premium eyewear for every style and occasion
          </p>
          <button 
            (click)="scrollToProducts()" 
            class="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      <section class="container mx-auto px-4 py-12" #productsSection>
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-primary">Featured Products</h2>
          <div class="flex space-x-4">
            <button 
              *ngFor="let category of categories"
              (click)="filterByCategory(category)"
              [class.bg-accent]="selectedCategory === category"
              [class.text-white]="selectedCategory === category"
              [class.bg-gray-200]="selectedCategory !== category"
              class="px-4 py-2 rounded-full text-sm font-medium transition-colors">
              {{ category }}
            </button>
          </div>
        </div>

        <div *ngIf="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let i of [1,2,3,4,5,6]" class="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div class="h-64 bg-gray-300 rounded mb-4"></div>
            <div class="h-4 bg-gray-300 rounded mb-2"></div>
            <div class="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>

        <div *ngIf="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <app-product-card 
            *ngFor="let product of filteredProducts" 
            [product]="product">
          </app-product-card>
        </div>

        <div *ngIf="!loading && filteredProducts.length === 0" class="text-center py-12">
          <p class="text-xl text-gray-500">No products found in this category.</p>
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = ['All'];
  selectedCategory: string = 'All';
  loading: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      },
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = ['All', ...categories];
      },
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        (p) => p.category === category
      );
    }
  }

  scrollToProducts(): void {
    const element = document.querySelector('[data-products-section]');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
