
import React from 'react';
import { Award, Target, Heart, Globe } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2070"
            alt="About Banner"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Our Legacy</h1>
          <p className="text-xl uppercase tracking-[0.3em] font-light">Crafting Elegance Since 2015</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-8">Brand Story</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            CEO Darlington Fashion House Ltd was born from a vision to bring high-end, premium fashion to Agbor and beyond. We believe that what you wear is an extension of your personality and your success.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            From our humble beginnings, we have grown into a leading name in high-quality fashion wears, accessories, and luxury timepieces. Our commitment remains the same: stylish, durable, and affordable excellence for men and women worldwide.
          </p>
        </div>
      </section>

      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="text-center space-y-4">
            <Award size={48} className="mx-auto text-amber-500" />
            <h3 className="text-xl font-bold font-serif">Premium Quality</h3>
            <p className="text-sm text-gray-400">Only the finest fabrics and materials pass our quality inspection.</p>
          </div>
          <div className="text-center space-y-4">
            <Target size={48} className="mx-auto text-amber-500" />
            <h3 className="text-xl font-bold font-serif">Mission Driven</h3>
            <p className="text-sm text-gray-400">Empowering individuals through professional and elegant styling.</p>
          </div>
          <div className="text-center space-y-4">
            <Heart size={48} className="mx-auto text-amber-500" />
            <h3 className="text-xl font-bold font-serif">Customer First</h3>
            <p className="text-sm text-gray-400">Exceptional service is at the core of our business values.</p>
          </div>
          <div className="text-center space-y-4">
            <Globe size={48} className="mx-auto text-amber-500" />
            <h3 className="text-xl font-bold font-serif">Global Vision</h3>
            <p className="text-sm text-gray-400">Exporting Nigerian fashion excellence to the rest of the world.</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1000"
            alt="Fashion workshop"
            className="rounded-sm shadow-xl"
          />
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold">The Visionnaire</h2>
            <p className="text-gray-600 leading-relaxed">
              "Fashion is not just about clothes; it is about how they make you feel. At CEO Darlington, we don't just sell outfits; we sell confidence, authority, and timeless style."
            </p>
            <div className="pt-4 border-t w-48">
              <p className="font-bold uppercase tracking-widest text-sm">— Darlington O.</p>
              <p className="text-xs text-gray-400">Founder & Creative Director</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
