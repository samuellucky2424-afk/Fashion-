
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, BusinessHours } from './types';
import { INITIAL_PRODUCTS, INITIAL_BUSINESS_HOURS } from './constants';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  orders: Order[];
  businessHours: BusinessHours[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  placeOrder: (order: Order) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateBusinessHours: (hours: BusinessHours[]) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>({
    id: 'u1',
    name: 'Admin User',
    email: 'admin@ceodarlington.com',
    role: 'admin',
    wishlist: [],
    orders: []
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [businessHours, setBusinessHours] = useState<BusinessHours[]>(INITIAL_BUSINESS_HOURS);

  const addToCart = (product: Product, size: string, color: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size && item.selectedColor === color)));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const placeOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    clearCart();
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateBusinessHours = (hours: BusinessHours[]) => {
    setBusinessHours(hours);
  };

  return (
    <ShopContext.Provider value={{
      products, cart, wishlist, user, orders, businessHours,
      addToCart, removeFromCart, clearCart, toggleWishlist, placeOrder,
      updateProduct, deleteProduct, updateBusinessHours
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
