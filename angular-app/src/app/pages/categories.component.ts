import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { ProductCardComponent } from '../components/product-card.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-primary mb-8">Categories</h1>

        <div class="grid md:grid-cols-4 gap-6 mb-12">
          <button 
            *ngFor="let category of categories"
            (click)="selectCategory(category)"
            [class.bg-accent]="selectedCategory === category"
            [class.text-white]="selectedCategory === category"
            [class.shadow-lg]="selectedCategory === category"
            [class.bg-white]="selectedCategory !== category"
            class="p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h3 class="text-xl font-semibold">{{ category }}</h3>
          </button>
        </div>

        <div *ngIf="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let i of [1,2,3,4,5,6]" class="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div class="h-64 bg-gray-300 rounded mb-4"></div>
            <div class="h-4 bg-gray-300 rounded mb-2"></div>
            <div class="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>

        <div *ngIf="!loading && selectedCategory">
          <h2 class="text-2xl font-bold text-primary mb-6">{{ selectedCategory }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <app-product-card 
              *ngFor="let product of filteredProducts" 
              [product]="product">
            </app-product-card>
          </div>

          <div *ngIf="filteredProducts.length === 0" class="text-center py-12">
            <p class="text-xl text-gray-500">No products found in this category.</p>
          </div>
        </div>

        <div *ngIf="!loading && !selectedCategory" class="text-center py-12">
          <p class="text-xl text-gray-500">Select a category to view products</p>
        </div>
      </div>
    </div>
  `,
})
export class CategoriesComponent implements OnInit {
  categories: string[] = [];
  selectedCategory: string = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        if (categories.length > 0) {
          this.selectCategory(categories[0]);
        }
      },
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        if (this.selectedCategory) {
          this.filterProducts();
        }
      },
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterProducts();
  }

  filterProducts(): void {
    this.loading = true;
    setTimeout(() => {
      this.filteredProducts = this.products.filter(
        (p) => p.category === this.selectedCategory
      );
      this.loading = false;
    }, 300);
  }
}
