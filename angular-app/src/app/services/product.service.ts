import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Classic Aviator Sunglasses',
      brand: 'Ray-Ban',
      price: 159.99,
      description: 'Iconic aviator style with polarized lenses for superior sun protection.',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400',
      category: 'Aviator',
      rating: 4.8,
      reviews: 245,
      inStock: true,
    },
    {
      id: 2,
      name: 'Wayfarer Classic',
      brand: 'Ray-Ban',
      price: 149.99,
      description: 'Timeless design with modern lens technology.',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
      category: 'Wayfarer',
      rating: 4.7,
      reviews: 189,
      inStock: true,
    },
    {
      id: 3,
      name: 'Sport Performance',
      brand: 'Oakley',
      price: 189.99,
      description: 'High-performance sports sunglasses with impact resistance.',
      image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400',
      category: 'Sport',
      rating: 4.9,
      reviews: 312,
      inStock: true,
    },
    {
      id: 4,
      name: 'Round Vintage',
      brand: 'Persol',
      price: 199.99,
      description: 'Vintage-inspired round frames with Italian craftsmanship.',
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400',
      category: 'Round',
      rating: 4.6,
      reviews: 156,
      inStock: true,
    },
    {
      id: 5,
      name: 'Clubmaster',
      brand: 'Ray-Ban',
      price: 169.99,
      description: 'Retro clubmaster style with a modern twist.',
      image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=400',
      category: 'Clubmaster',
      rating: 4.7,
      reviews: 201,
      inStock: true,
    },
    {
      id: 6,
      name: 'Polarized Sport',
      brand: 'Oakley',
      price: 219.99,
      description: 'Advanced polarized lenses for outdoor adventures.',
      image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400',
      category: 'Sport',
      rating: 4.8,
      reviews: 278,
      inStock: true,
    },
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products).pipe(delay(500));
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find((p) => p.id === id);
    return of(product).pipe(delay(300));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const filtered = this.products.filter((p) => p.category === category);
    return of(filtered).pipe(delay(500));
  }

  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.products.map((p) => p.category))];
    return of(categories).pipe(delay(300));
  }

  getBrands(): Observable<string[]> {
    const brands = [...new Set(this.products.map((p) => p.brand))];
    return of(brands).pipe(delay(300));
  }
}
