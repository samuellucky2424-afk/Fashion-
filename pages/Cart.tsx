
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useShop } from '../ShopContext';
import { NGN_FORMAT } from '../constants';

const Cart: React.FC = () => {
  const { cart, removeFromCart, addToCart } = useShop();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 150000 ? 0 : 5000;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-3xl font-serif font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our latest collection and find something unique.</p>
        <Link
          to="/shop"
          className="inline-block bg-amber-600 text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-amber-700 transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="responsive-container py-12">
      <h1 className="text-4xl font-serif font-bold mb-12">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <div className="border-t">
            {cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex py-8 border-b items-center gap-6">
                <div className="w-24 h-32 flex-shrink-0 overflow-hidden bg-gray-100">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold hover:text-amber-600 transition-colors">
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </h3>
                      <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                        Category: {item.category}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
                        {item.selectedSize && <span className="text-gray-600">Size: {item.selectedSize}</span>}
                        {item.selectedColor && <span className="text-gray-600">Color: {item.selectedColor}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex border rounded-sm">
                      <button className="px-3 py-1 hover:bg-gray-50">-</button>
                      <span className="px-4 py-1 flex items-center justify-center font-bold text-sm">{item.quantity}</span>
                      <button className="px-3 py-1 hover:bg-gray-50">+</button>
                    </div>
                    <p className="font-bold text-lg">{NGN_FORMAT.format(item.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/shop" className="text-amber-600 font-bold uppercase text-xs tracking-[0.2em] flex items-center hover:opacity-80">
              <ChevronLeft size={16} className="mr-2" /> Continue Shopping
            </Link>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white p-8 border rounded-sm sticky top-32">
            <h3 className="text-xl font-bold font-serif mb-6 uppercase tracking-widest">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold">{NGN_FORMAT.format(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Shipping</span>
                <span className="font-bold">{shipping === 0 ? 'FREE' : NGN_FORMAT.format(shipping)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-gray-900 text-lg">
                <span className="font-serif font-bold">Total</span>
                <span className="font-bold">{NGN_FORMAT.format(total)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="w-full bg-neutral-900 text-white flex items-center justify-center py-5 uppercase font-bold tracking-[0.2em] text-sm hover:bg-amber-600 transition-all mb-4"
            >
              Secure Checkout <ArrowRight className="ml-2" size={18} />
            </Link>
            <div className="text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">We Accept</p>
              <div className="flex justify-center space-x-4 grayscale opacity-60">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="Paypal" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChevronLeft: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

export default Cart;
