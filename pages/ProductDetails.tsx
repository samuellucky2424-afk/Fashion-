
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, Shield, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../ShopContext';
import { NGN_FORMAT } from '../constants';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, toggleWishlist, wishlist } = useShop();
  const product = products.find(p => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/shop" className="text-amber-600 underline">Back to Shop</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }
    if (product.colors.length > 0 && !selectedColor) {
      alert('Please select a color');
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    alert('Added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex mb-8 text-xs font-medium uppercase tracking-widest text-gray-500">
        <Link to="/" className="hover:text-amber-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-amber-600">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden group">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square border-2 transition-all ${
                  selectedImage === idx ? 'border-amber-600' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-8 border-b pb-8">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-bold text-amber-600 uppercase tracking-[0.2em]">{product.category}</span>
              <div className="flex items-center space-x-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
                <span className="text-gray-400 text-xs font-medium ml-2">({product.rating})</span>
              </div>
            </div>
            <h1 className="text-4xl font-serif font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold mb-6 text-gray-900">{NGN_FORMAT.format(product.price)}</p>
            <p className="text-gray-600 leading-relaxed max-w-lg">{product.description}</p>
          </div>

          <div className="space-y-8 mb-10 pb-8 border-b">
            {product.colors.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Color: <span className="text-gray-500 font-medium">{selectedColor || 'Select'}</span></h4>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs uppercase font-bold tracking-widest border transition-all ${
                        selectedColor === color ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-600 hover:border-neutral-900'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Size: <span className="text-gray-500 font-medium">{selectedSize || 'Select'}</span></h4>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center text-xs font-bold border transition-all ${
                        selectedSize === size ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-600 hover:border-neutral-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <div className="flex border rounded-sm overflow-hidden h-14">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="w-12 flex items-center justify-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white h-14 flex items-center justify-center space-x-3 text-sm font-bold uppercase tracking-[0.2em] transition-all"
              >
                <ShoppingBag size={20} />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 h-14 flex items-center justify-center border transition-all ${
                  isWishlisted ? 'bg-amber-600 border-amber-600 text-white' : 'hover:border-amber-600 text-gray-400'
                }`}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Truck size={18} className="text-amber-600" />
              <span>Free delivery on orders above ₦150,000</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Shield size={18} className="text-amber-600" />
              <span>Authentic products & secure checkout</span>
            </div>
            <button className="flex items-center space-x-3 text-sm text-gray-600 hover:text-amber-600">
              <Share2 size={18} />
              <span>Share this product</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
