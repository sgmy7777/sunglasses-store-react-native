export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating?: number;
  reviews?: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  status: string;
  date: Date;
}
