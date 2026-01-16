
import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold mb-4">Get In Touch</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">We'd love to hear from you. Whether you have a question about our collection or need styling advice, our team is here to help.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="space-y-12">
          <div className="flex items-start space-x-6">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-2">Visit Our House</h3>
              <p className="text-gray-500 leading-relaxed text-sm">33 Old Lagos–Asaba Road, Agbor,<br />Delta State, Nigeria</p>
            </div>
          </div>

          <div className="flex items-start space-x-6">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-2">Email Us</h3>
              <p className="text-gray-500 leading-relaxed text-sm">ceodarlingtonfashionhouseltd@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-6">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-2">Call Us</h3>
              <p className="text-gray-500 leading-relaxed text-sm">+234 812 345 6789</p>
            </div>
          </div>

          <div className="p-8 bg-neutral-900 text-white rounded-sm">
            <h4 className="text-xl font-serif font-bold mb-4">Direct Styling Help?</h4>
            <p className="text-sm text-gray-400 mb-6">Chat directly with our team for quick responses to sizing, custom orders, or availability.</p>
            <a
              href="https://wa.me/2348123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 font-bold uppercase tracking-widest text-xs transition-all"
            >
              <MessageCircle size={18} />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10 bg-white border shadow-sm">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">Full Name</label>
              <input required type="text" className="w-full border p-4 focus:ring-1 focus:ring-amber-500 outline-none" placeholder="John Doe" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">Email Address</label>
              <input required type="email" className="w-full border p-4 focus:ring-1 focus:ring-amber-500 outline-none" placeholder="john@example.com" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">Subject</label>
              <input required type="text" className="w-full border p-4 focus:ring-1 focus:ring-amber-500 outline-none" placeholder="How can we help?" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">Your Message</label>
              <textarea required rows={6} className="w-full border p-4 focus:ring-1 focus:ring-amber-500 outline-none resize-none" placeholder="Describe your inquiry..."></textarea>
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-neutral-900 text-white py-5 font-bold uppercase tracking-widest text-sm hover:bg-amber-600 transition-all flex items-center justify-center">
                Send Message <Send size={18} className="ml-2" />
              </button>
            </div>
          </form>

          <div className="h-96 w-full bg-gray-200 grayscale rounded-sm overflow-hidden">
             {/* Mock Map Replacement */}
             <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 text-center px-4">
                <MapPin size={48} className="mb-4 text-amber-600" />
                <p className="font-bold uppercase tracking-widest">Map View (Agbor, Delta State)</p>
                <p className="text-xs mt-2">Visit us at 33 Old Lagos–Asaba Road</p>
                <div className="mt-8 bg-white p-2 rounded shadow-sm text-[10px] uppercase font-bold tracking-widest text-neutral-400">Google Maps Integration Placeholder</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
