"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#FAF6F2] pt-20 pb-10 w-full border-t border-[#EAE3DC] font-sans relative z-20">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        
        {/* Top Newsletter & Brand Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#EAE3DC] items-center">
          
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative w-[180px] h-[54px]">
              <Image 
                src="/logo.png" 
                alt="House of Saanvi" 
                fill 
                className="object-contain object-left brightness-0"
              />
            </div>
            <p className="text-[15px] leading-[1.7] text-ink-black/75 max-w-md">
              Contemporary women's fashion blending timeless Indian heritage with modern minimalism. Designed for effortless elegance.
            </p>
          </div>

          {/* Newsletter Input Box */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <h4 className="font-sans font-bold text-[13px] tracking-[2px] uppercase text-ink-black">
              SUBSCRIBE TO OUR NEWSLETTER
            </h4>
            <p className="text-[14px] text-ink-black/70">
              Receive updates on new arrivals, exclusive seasonal drops, and insider sales.
            </p>

            {isSubscribed ? (
              <div className="h-[50px] px-5 rounded-[6px] bg-emerald-50 border border-emerald-200 text-emerald-800 text-[14px] font-semibold flex items-center gap-2 shadow-sm animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                Thank you for subscribing! Welcome to House of Saanvi.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 mt-1">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  required
                  className="h-[50px] px-4 rounded-[6px] bg-white border border-[#E0D7CF] text-[14px] text-ink-black placeholder:text-ink-black/40 focus:outline-none focus:border-ink-black flex-1 shadow-sm transition-all"
                />
                <button 
                  type="submit" 
                  className="h-[50px] px-7 rounded-[6px] bg-ink-black text-pure-white font-sans font-bold text-[13px] tracking-[1.5px] uppercase hover:bg-ink-black/90 transition-all flex-shrink-0 shadow-sm"
                >
                  JOIN
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          
          {/* Shop Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[13px] tracking-[2px] uppercase text-ink-black">Shop</h3>
            <ul className="space-y-3 text-[14px] text-ink-black/70 font-medium">
              <li><Link href="/category/new-in" className="hover:text-ink-black transition-colors">New Arrivals</Link></li>
              <li><Link href="/category/sarees" className="hover:text-ink-black transition-colors">Sarees</Link></li>
              <li><Link href="/category/lehengas" className="hover:text-ink-black transition-colors">Lehengas</Link></li>
              <li><Link href="/category/kurtas" className="hover:text-ink-black transition-colors">Kurtas</Link></li>
              <li><Link href="/category/dresses" className="hover:text-ink-black transition-colors">Dresses</Link></li>
              <li><Link href="/category/sale" className="hover:text-ink-black transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Collections Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[13px] tracking-[2px] uppercase text-ink-black">Collections</h3>
            <ul className="space-y-3 text-[14px] text-ink-black/70 font-medium">
              <li><Link href="/category/coord-sets" className="hover:text-ink-black transition-colors">Co-ord Sets</Link></li>
              <li><Link href="/category/dupattas" className="hover:text-ink-black transition-colors">Dupattas</Link></li>
              <li><Link href="/category/best-sellers" className="hover:text-ink-black transition-colors">Best Sellers</Link></li>
              <li><Link href="/category/festive" className="hover:text-ink-black transition-colors">Festive Drapes</Link></li>
            </ul>
          </div>

          {/* Help Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[13px] tracking-[2px] uppercase text-ink-black">Customer Care</h3>
            <ul className="space-y-3 text-[14px] text-ink-black/70 font-medium">
              <li><Link href="/contact" className="hover:text-ink-black transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-ink-black transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/returns" className="hover:text-ink-black transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/faqs" className="hover:text-ink-black transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Social & Connect Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[13px] tracking-[2px] uppercase text-ink-black">Follow Us</h3>
            <ul className="space-y-3 text-[14px] text-ink-black/70 font-medium">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-ink-black transition-colors">Instagram</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-ink-black transition-colors">Pinterest</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-ink-black transition-colors">Facebook</a></li>
              <li><a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="hover:text-ink-black transition-colors">WhatsApp Concierge</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights & Links */}
        <div className="border-t border-[#EAE3DC] pt-8 flex flex-col md:flex-row items-center justify-between text-[13px] font-medium text-ink-black/60 gap-4">
          <p>&copy; {new Date().getFullYear()} House of Saanvi. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-ink-black transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-ink-black transition-colors">Terms of Service</Link>
            <Link href="/shipping" className="hover:text-ink-black transition-colors">Shipping Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
