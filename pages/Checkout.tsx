
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useShop } from '../ShopContext';
import { NGN_FORMAT } from '../constants';
import { Order } from '../types';

const Checkout: React.FC = () => {
  const { cart, clearCart, placeOrder, user } = useShop();
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    paymentMethod: 'Online'
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 150000 ? 0 : 5000;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 100000)}`,
      userId: user?.id || 'guest',
      items: [...cart],
      total,
      status: 'Pending',
      date: new Date().toISOString(),
      paymentMethod: formData.paymentMethod as any,
      address: `${formData.address}, ${formData.city}, ${formData.state}`
    };
    placeOrder(newOrder);
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-4xl font-serif font-bold mb-4">Order Confirmed!</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Thank you for choosing CEO Darlington Fashion House. Your order has been successfully placed and is now being processed. You will receive an email confirmation shortly.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-amber-600 text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-amber-700 transition-all"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif font-bold mb-12">Secure Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-12">
          <section>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-8 border-b pb-4 flex items-center">
              <span className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center mr-3 text-xs">1</span>
              Shipping Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">First Name</label>
                <input required type="text" className="w-full border p-4 focus:ring-1 focus:ring-amber-500 outline-none" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Last Name</label>
                <input required type="text" className="w-full border p-4 focus:ring-1 focus:ring-amber-500 outline-none" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Email Address</label>
                <input required type="email" className="w-full border p-4 focus:ring-1 focus:ring-amber-500 outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Phone Number</label>
                <input required type="tel" className="w-full border p-4 focus:ring-1 focus:ring-amber-500 outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Full Address</label>
                <input required type="text" className="w-full border p-4 focus:ring-1 focus:ring-amber-500 outline-none" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">City</label>
                <input required type="text" className="w-full border p-4 focus:ring-1 focus:ring-amber-500 outline-none" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">State</label>
                <select required className="w-full border p-4 focus:ring-1 focus:ring-amber-500 outline-none" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})}>
                  <option value="">Select State</option>
                  <option value="Delta">Delta</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Anambra">Anambra</option>
                </select>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-8 border-b pb-4 flex items-center">
              <span className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center mr-3 text-xs">2</span>
              Payment Method
            </h3>
            <div className="space-y-4">
              <label className={`flex items-center p-6 border-2 cursor-pointer transition-all ${formData.paymentMethod === 'Online' ? 'border-amber-600 bg-amber-50' : 'border-gray-200'}`}>
                <input type="radio" name="payment" className="sr-only" checked={formData.paymentMethod === 'Online'} onChange={() => setFormData({...formData, paymentMethod: 'Online'})} />
                <CreditCard size={24} className="text-amber-600 mr-4" />
                <div>
                  <p className="font-bold">Paystack / Flutterwave (Secure Online Payment)</p>
                  <p className="text-xs text-gray-500">Fast, secure and convenient. All cards accepted.</p>
                </div>
              </label>
              <label className={`flex items-center p-6 border-2 cursor-pointer transition-all ${formData.paymentMethod === 'COD' ? 'border-amber-600 bg-amber-50' : 'border-gray-200'}`}>
                <input type="radio" name="payment" className="sr-only" checked={formData.paymentMethod === 'COD'} onChange={() => setFormData({...formData, paymentMethod: 'COD'})} />
                <Truck size={24} className="text-neutral-500 mr-4" />
                <div>
                  <p className="font-bold">Cash On Delivery</p>
                  <p className="text-xs text-gray-500">Pay only when you receive your order at your doorstep.</p>
                </div>
              </label>
            </div>
          </section>

          <button
            type="submit"
            className="w-full md:w-auto bg-neutral-900 text-white px-16 py-5 font-bold uppercase tracking-widest text-sm hover:bg-amber-600 transition-all shadow-lg"
          >
            Complete Purchase
          </button>
        </form>

        <aside className="lg:col-span-4">
          <div className="bg-gray-50 p-8 border rounded-sm sticky top-32">
            <h3 className="font-bold font-serif text-lg mb-6 uppercase tracking-widest border-b pb-4">Your Order</h3>
            <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-2">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-16 h-20 bg-white border flex-shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold truncate w-32">{item.name}</h4>
                    <p className="text-xs text-gray-500">Qty: {item.quantity} • {item.selectedSize}</p>
                    <p className="text-sm font-medium mt-1">{NGN_FORMAT.format(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{NGN_FORMAT.format(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : NGN_FORMAT.format(shipping)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-3 mt-3">
                <span className="font-serif">Total</span>
                <span className="text-amber-600">{NGN_FORMAT.format(total)}</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white border border-dashed text-center">
              <ShieldCheck size={20} className="mx-auto mb-2 text-green-600" />
              <p className="text-[10px] uppercase tracking-widest text-gray-400">100% SECURE TRANSACTIONS</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
