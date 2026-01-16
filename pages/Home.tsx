
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { useShop } from '../ShopContext';
import { NGN_FORMAT } from '../constants';
import { Product } from '../types';

const Home: React.FC = () => {
  const { products } = useShop();
  const featured = products.filter(p => p.isFeatured).slice(0, 5);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 10);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070"
            alt="Hero Background"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <p className="uppercase tracking-[0.3em] text-[10px] md:text-sm mb-4 text-amber-400 font-semibold">Excellence in Every Stitch</p>
          <h1 className="text-3xl md:text-8xl font-serif font-bold leading-tight mb-4 md:mb-8 max-w-3xl">
            Redefine Your <br /><span className="text-amber-500">Elegance</span>
          </h1>
          <p className="text-sm md:text-xl text-gray-200 mb-8 md:mb-10 max-w-xl font-light">
            Discover a curated collection of premium fashion wears and accessories designed for those who command respect.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6">
            <Link to="/shop" className="bg-amber-600 hover:bg-amber-700 text-white px-8 md:px-10 py-3 md:py-4 text-xs md:text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center">
              Shop Now <ArrowRight className="ml-2" size={16} />
            </Link>
            <Link to="/about" className="border border-white hover:bg-white hover:text-black text-white px-8 md:px-10 py-3 md:py-4 text-xs md:text-sm font-bold uppercase tracking-widest transition-all text-center">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 md:py-12 bg-white border-b overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 min-w-[600px] flex justify-between gap-4">
          {[
            { icon: Truck, title: 'Fast Shipping', sub: 'Across Nigeria' },
            { icon: ShieldCheck, title: 'Premium Quality', sub: 'Handpicked materials' },
            { icon: RefreshCw, title: 'Easy Returns', sub: '7-day guarantee' },
            { icon: ShoppingBag, title: 'Secure Payment', sub: '100% safe transactions' }
          ].map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-2 md:mb-4">
                <badge.icon size={20} />
              </div>
              <h3 className="font-bold text-[10px] md:text-sm uppercase tracking-wider mb-0.5">{badge.title}</h3>
              <p className="text-[9px] md:text-xs text-gray-500">{badge.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Pieces - Responsive Grid */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8 md:mb-12 px-2">
            <div>
              <p className="text-amber-600 text-[10px] md:text-sm font-bold uppercase tracking-widest mb-1 md:mb-2">Curated for you</p>
              <h2 className="text-2xl md:text-4xl font-serif font-bold">Featured Pieces</h2>
            </div>
            <Link to="/shop" className="text-gray-900 font-bold uppercase text-[10px] md:text-sm tracking-widest flex items-center border-b-2 border-amber-600 pb-1">
              View All <ArrowRight className="ml-2" size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-4 md:gap-x-4 md:gap-y-8">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[600px]">
        <Link to="/shop?category=Men" className="relative group overflow-hidden h-64 md:h-full">
          <img
            src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=1000"
            alt="Men's Fashion"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all flex flex-col items-center justify-center text-white">
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">Gentlemen</h3>
            <span className="border border-white px-6 md:px-8 py-2 md:py-3 uppercase text-[10px] md:text-xs tracking-[0.2em] group-hover:bg-white group-hover:text-black transition-all">Explore More</span>
          </div>
        </Link>
        <Link to="/shop?category=Women" className="relative group overflow-hidden h-64 md:h-full">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000"
            alt="Women's Fashion"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all flex flex-col items-center justify-center text-white">
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">Elegance</h3>
            <span className="border border-white px-6 md:px-8 py-2 md:py-3 uppercase text-[10px] md:text-xs tracking-[0.2em] group-hover:bg-white group-hover:text-black transition-all">Explore More</span>
          </div>
        </Link>
      </section>

      {/* New Arrivals - Responsive Grid */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <p className="text-amber-600 text-[10px] md:text-sm font-bold uppercase tracking-widest mb-1 md:mb-2">Just Landed</p>
            <h2 className="text-2xl md:text-4xl font-serif font-bold">New Arrivals</h2>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-4 md:gap-x-4 md:gap-y-8">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : null;

  return (
    <Link to={`/product/${product.id}`} className="group flex flex-col h-full bg-white rounded shadow-sm hover:shadow-md transition-shadow border border-gray-50 overflow-hidden">
      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-1 left-1 md:top-2 md:left-2 bg-red-600 text-white text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm z-10">
            -{discount}%
          </div>
        )}
        {/* New Badge */}
        {product.isNewArrival && !discount && (
          <div className="absolute top-1 left-1 md:top-2 md:left-2 bg-amber-500 text-white text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm z-10 uppercase tracking-widest">
            New
          </div>
        )}
      </div>
      
      <div className="p-1.5 md:p-3 flex flex-col flex-grow">
        <h3 className="text-[10px] md:text-sm font-medium text-gray-800 line-clamp-2 leading-tight md:leading-snug flex-grow min-h-[2.4em] md:min-h-[2.8em]">
          {product.name}
        </h3>
        
        <div className="mt-1 md:mt-2 space-y-0.5">
          <div className="flex items-center flex-wrap gap-x-1">
            <span className="text-xs md:text-base font-bold text-gray-900">
              {NGN_FORMAT.format(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[9px] md:text-xs text-gray-400 line-through">
                {NGN_FORMAT.format(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1 mt-auto">
            <div className="flex text-amber-500">
              <Star size={10} className="fill-current" />
            </div>
            <span className="text-[9px] md:text-xs text-gray-500 font-medium">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Home;
