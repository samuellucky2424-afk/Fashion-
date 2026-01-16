
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu, X, Search } from 'lucide-react';
import { useShop } from '../ShopContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, wishlist, user } = useShop();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    ...(user?.role === 'admin' ? [{ name: 'Admin', path: '/admin' }] : []),
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl md:text-2xl font-bold tracking-tighter font-serif">
                CEO DARLINGTON
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-amber-600 ${
                  location.pathname === link.path ? 'text-amber-600' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-500 hover:text-amber-600"><Search size={20} /></button>
            <Link to="/account" className="text-gray-500 hover:text-amber-600"><User size={20} /></Link>
            <Link to="/wishlist" className="text-gray-500 hover:text-amber-600 relative">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="text-gray-500 hover:text-amber-600 relative">
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-4">
             <Link to="/cart" className="text-gray-500 relative">
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-gray-50 uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/account"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-gray-50 uppercase tracking-widest"
            >
              Account
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-gray-50 uppercase tracking-widest"
            >
              Wishlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
