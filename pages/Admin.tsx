
import React, { useState } from 'react';
import { useShop } from '../ShopContext';
import { Package, ShoppingCart, Users, Clock, Plus, Edit, Trash2, CheckCircle, TrendingUp } from 'lucide-react';
import { NGN_FORMAT } from '../constants';

const Admin: React.FC = () => {
  const { products, orders, businessHours, updateBusinessHours, deleteProduct } = useShop();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'hours'>('dashboard');

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <nav className="md:w-64 space-y-2">
          <h1 className="text-2xl font-serif font-bold mb-8 px-4">Admin Hub</h1>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'hours', label: 'Business Hours', icon: Clock },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all rounded-sm ${
                activeTab === tab.id ? 'bg-neutral-900 text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main className="flex-1 bg-white border p-8 rounded-sm">
          {activeTab === 'dashboard' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-amber-50 p-6 rounded-sm border border-amber-100">
                  <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Total Revenue</p>
                  <p className="text-3xl font-serif font-bold">{NGN_FORMAT.format(totalRevenue)}</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-sm border border-blue-100">
                  <p className="text-xs uppercase tracking-widest text-blue-600 font-bold mb-2">Total Orders</p>
                  <p className="text-3xl font-serif font-bold">{orders.length}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-sm border border-green-100">
                  <p className="text-xs uppercase tracking-widest text-green-600 font-bold mb-2">Total Products</p>
                  <p className="text-3xl font-serif font-bold">{products.length}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold mb-6">Recent Sales</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b text-xs uppercase tracking-widest text-gray-400">
                      <tr>
                        <th className="py-4 font-bold">Order ID</th>
                        <th className="py-4 font-bold">Customer</th>
                        <th className="py-4 font-bold">Amount</th>
                        <th className="py-4 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-sm">
                      {orders.length > 0 ? orders.map(order => (
                        <tr key={order.id}>
                          <td className="py-4 font-bold">{order.id}</td>
                          <td className="py-4">{order.userId}</td>
                          <td className="py-4">{NGN_FORMAT.format(order.total)}</td>
                          <td className="py-4">
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase rounded-full">
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan={4} className="py-8 text-center text-gray-400">No orders yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-serif font-bold">Manage Inventory</h3>
                <button className="bg-neutral-900 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center hover:bg-amber-600 transition-all">
                  <Plus size={16} className="mr-2" /> Add Product
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => (
                  <div key={p.id} className="border p-4 flex gap-4 rounded-sm">
                    <img src={p.images[0]} className="w-20 h-24 object-cover" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm leading-tight">{p.name}</h4>
                        <p className="text-xs text-amber-600 font-medium">{NGN_FORMAT.format(p.price)}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Stock: {p.stock}</p>
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <button className="p-2 text-gray-400 hover:text-amber-600 transition-colors"><Edit size={16} /></button>
                        <button onClick={() => deleteProduct(p.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hours' && (
            <div>
              <h3 className="text-2xl font-serif font-bold mb-8">Edit Business Hours</h3>
              <div className="space-y-6 max-w-xl">
                {businessHours.map((hour, idx) => (
                  <div key={hour.day} className="flex items-center gap-6">
                    <span className="w-24 font-bold text-sm uppercase tracking-widest text-gray-500">{hour.day}</span>
                    <input
                      type="text"
                      value={hour.open}
                      onChange={(e) => {
                        const newHours = [...businessHours];
                        newHours[idx].open = e.target.value;
                        updateBusinessHours(newHours);
                      }}
                      className="border p-2 text-sm w-32 focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                    <span className="text-gray-400">to</span>
                    <input
                      type="text"
                      value={hour.close}
                      onChange={(e) => {
                        const newHours = [...businessHours];
                        newHours[idx].close = e.target.value;
                        updateBusinessHours(newHours);
                      }}
                      className="border p-2 text-sm w-32 focus:ring-1 focus:ring-amber-500 outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
