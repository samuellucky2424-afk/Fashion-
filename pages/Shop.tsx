
import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, X, Star } from 'lucide-react';
import { useShop } from '../ShopContext';
import { NGN_FORMAT } from '../constants';
import { Category, Product } from '../types';

const Shop: React.FC = () => {
  const { products } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const categories: Category[] = ['Men', 'Women', 'Accessories', 'Watches', 'Sets'];
  const currentCategory = searchParams.get('category') as Category | null;

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (currentCategory) {
      result = result.filter(p => p.category === currentCategory);
    }

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [products, currentCategory, sortBy]);

  const handleCategoryChange = (cat: Category | null) => {
    if (cat) setSearchParams({ category: cat });
    else setSearchParams({});
  };

  return (
    <div className="max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8 py-6 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 border-b pb-4 md:pb-8">
        <div>
          <h1 className="text-2xl md:text-4xl font-serif font-bold mb-1">Our Collection</h1>
          <p className="text-xs md:text-sm text-gray-500">{filteredProducts.length} items found</p>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4 mt-4 md:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 border border-gray-200 px-3 py-2 text-xs font-medium hover:bg-gray-50 md:hidden rounded"
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </button>
          <div className="relative group inline-block flex-1 md:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 px-3 py-2 pr-8 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer rounded"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-12">
        {/* Sidebar Filters */}
        <aside className={`lg:w-64 space-y-8 ${showFilters ? 'fixed inset-0 z-[60] bg-white p-6 overflow-y-auto' : 'hidden lg:block'}`}>
          <div className="flex justify-between items-center lg:hidden mb-6">
            <h3 className="font-bold uppercase tracking-widest text-sm">Filter By</h3>
            <button onClick={() => setShowFilters(false)} className="p-2 -mr-2"><X size={20} /></button>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b pb-2">Categories</h3>
            <div className="space-y-3">
              <button
                onClick={() => { handleCategoryChange(null); setShowFilters(false); }}
                className={`block text-xs transition-colors py-1 ${!currentCategory ? 'text-amber-600 font-bold' : 'text-gray-600 hover:text-amber-600'}`}
              >
                All Collections
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { handleCategoryChange(cat); setShowFilters(false); }}
                  className={`block text-xs transition-colors py-1 ${currentCategory === cat ? 'text-amber-600 font-bold' : 'text-gray-600 hover:text-amber-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b pb-2">Price Range</h3>
            <div className="space-y-3">
              {['Under ₦25,000', '₦25k - ₦75k', 'Above ₦75,000'].map((label) => (
                <label key={label} className="flex items-center space-x-3 cursor-pointer group">
                  <input type="checkbox" className="form-checkbox text-amber-600 rounded border-gray-300 w-4 h-4" />
                  <span className="text-xs text-gray-600 group-hover:text-amber-600">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid - Optimized for Mobile (3), Tablet (4), Desktop (5) */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-4 md:gap-x-4 md:gap-y-8">
              {filteredProducts.map(product => (
                <ProductGridItem key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-gray-500 mb-6 text-sm">No products found matching your selection.</p>
              <button
                onClick={() => handleCategoryChange(null)}
                className="text-amber-600 font-bold uppercase text-[10px] tracking-widest border-b-2 border-amber-600 pb-1"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductGridItem: React.FC<{ product: Product }> = ({ product }) => {
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
            <span className="text-[9px] text-gray-400 hidden sm:inline">• {product.stock > 0 ? 'In Stock' : 'Out'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Shop;
