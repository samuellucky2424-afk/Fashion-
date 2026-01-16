
export type Category = 'Men' | 'Women' | 'Accessories' | 'Watches' | 'Sets';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  reviews: Review[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  paymentMethod: 'Online' | 'COD';
  address: string;
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  wishlist: string[];
  orders: Order[];
}
