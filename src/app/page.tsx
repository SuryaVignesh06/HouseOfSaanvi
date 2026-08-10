"use client";

import { HeroBanner } from "@/components/hero/HeroBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { useProductStore } from "@/stores/useProductStore";
import Link from "next/link";

export default function Home() {
  const products = useProductStore((state) => state.products);
  
  // Get 4 New Arrivals and 4 Best Sellers
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const bestSellers = products.slice(0, 4); // In a real app, filter by best seller flag

  return (
    <div className="flex flex-col bg-pure-white min-h-screen relative overflow-hidden font-sans">
      
      {/* 
        Hero Frame Geometry 
        Minimal intentional white framing (10-12px)
      */}
      <div className="relative w-full p-2 md:p-3 lg:p-3.5 z-10 flex justify-center h-screen min-h-[660px] max-h-[940px]">
        {/* Inner Lavender Hero Container */}
        <div className="relative w-full h-full rounded-[24px] md:rounded-[32px] overflow-hidden bg-gradient-to-b from-[#D4BEF2] via-[#C3A6E8] to-[#B28FDC] shadow-[0_18px_50px_rgba(50,40,60,0.12)] flex flex-col justify-between">
          <Header inFrame={true} />
          <HeroBanner />
        </div>
      </div>

      {/* NEW ARRIVALS SECTION */}
      <section className="w-full max-w-[1500px] mx-auto px-6 md:px-8 mt-[72px] md:mt-[96px] relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">
          <div>
            <h2 className="font-serif text-[48px] md:text-[56px] text-ink-black leading-none tracking-wide">
              New Arrivals
            </h2>
          </div>
          <Link href="/category/new-in" className="inline-flex items-center gap-2 font-sans font-medium text-[15px] uppercase tracking-[1px] text-ink-black hover:text-ink-black/70 transition-colors mt-4 md:mt-0">
            View all <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* BEST SELLERS SECTION */}
      <section className="w-full max-w-[1500px] mx-auto px-6 md:px-8 mt-[96px] md:mt-[120px] mb-[100px] md:mb-[120px] relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">
          <div>
            <h2 className="font-serif text-[48px] md:text-[56px] text-ink-black leading-none tracking-wide">
              Best Sellers
            </h2>
          </div>
          <Link href="/category/best-sellers" className="inline-flex items-center gap-2 font-sans font-medium text-[15px] uppercase tracking-[1px] text-ink-black hover:text-ink-black/70 transition-colors mt-4 md:mt-0">
            View all <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {bestSellers.map((product) => (
            <ProductCard key={`bs-${product.id}`} product={product} />
          ))}
        </div>
      </section>
      
    </div>
  );
}
