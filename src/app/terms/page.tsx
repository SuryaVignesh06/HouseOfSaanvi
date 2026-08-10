"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen pt-32 md:pt-40 pb-24 font-sans">
      <div className="container mx-auto px-6 md:px-12 max-w-[1000px]">
        
        <div className="mb-10 border-b border-[#EBE4DC] pb-8">
          <div className="flex items-center gap-2 text-[13px] text-ink-black/60 font-medium tracking-[0.5px] mb-3">
            <Link href="/" className="hover:text-ink-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ink-black font-semibold uppercase">Terms of Service</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-ink-black font-bold">Terms & Conditions</h1>
          <p className="text-xs text-ink-black/60 mt-2">Last Updated: August 2026</p>
        </div>

        <div className="bg-white border border-ink-black/10 rounded-[32px] p-8 md:p-12 shadow-sm space-y-6 text-xs md:text-sm text-ink-black/80 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-ink-black mb-2">1. Agreement to Terms</h2>
            <p>
              By accessing or using the House of Saanvi website, purchasing products, or engaging our concierge services, you agree to be bound by these Terms and Conditions.
            </p>
          </section>

          <section className="border-t border-ink-black/10 pt-4">
            <h2 className="font-serif text-xl font-bold text-ink-black mb-2">2. Product Colors & Handicraft Variations</h2>
            <p>
              Many of our garments are crafted with traditional handloom, block printing, and hand embroidery techniques. Slight variations in thread work, dye shades, or weave texture are natural characteristics of authentic handcrafted garments and are not considered defects.
            </p>
          </section>

          <section className="border-t border-ink-black/10 pt-4">
            <h2 className="font-serif text-xl font-bold text-ink-black mb-2">3. Pricing & Taxes</h2>
            <p>
              All prices listed on our website are inclusive of applicable Indian GST (Goods and Services Tax). Prices are subject to change without notice for upcoming drops or promotional campaigns.
            </p>
          </section>

          <section className="border-t border-ink-black/10 pt-4">
            <h2 className="font-serif text-xl font-bold text-ink-black mb-2">4. Intellectual Property</h2>
            <p>
              All content, design patterns, product photography, logos, and branding assets on House of Saanvi are protected under copyright and trademark laws.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
