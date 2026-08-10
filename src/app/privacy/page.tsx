"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen pt-32 md:pt-40 pb-24 font-sans">
      <div className="container mx-auto px-6 md:px-12 max-w-[1000px]">
        
        <div className="mb-10 border-b border-[#EBE4DC] pb-8">
          <div className="flex items-center gap-2 text-[13px] text-ink-black/60 font-medium tracking-[0.5px] mb-3">
            <Link href="/" className="hover:text-ink-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ink-black font-semibold uppercase">Privacy Policy</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-ink-black font-bold">Privacy Policy</h1>
          <p className="text-xs text-ink-black/60 mt-2">Last Updated: August 2026</p>
        </div>

        <div className="bg-white border border-ink-black/10 rounded-[32px] p-8 md:p-12 shadow-sm space-y-6 text-xs md:text-sm text-ink-black/80 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-ink-black mb-2">1. Overview</h2>
            <p>
              House of Saanvi ("we", "our", or "us") respects your personal privacy. This Privacy Policy outlines how we collect, store, use, and safeguard your personal information when you visit our website or make purchases through our store.
            </p>
          </section>

          <section className="border-t border-ink-black/10 pt-4">
            <h2 className="font-serif text-xl font-bold text-ink-black mb-2">2. Information We Collect</h2>
            <p>
              When you place an order or create an account, we collect personal information including your full name, shipping address, email address, phone number, and transaction details. We do NOT store complete credit card or financial banking details on our servers; all payment transactions are handled through PCI-DSS compliant secure payment gateways.
            </p>
          </section>

          <section className="border-t border-ink-black/10 pt-4">
            <h2 className="font-serif text-xl font-bold text-ink-black mb-2">3. How We Use Your Data</h2>
            <p>
              Your data is strictly used to fulfill orders, process payments, arrange door-to-door courier delivery, send order status notifications, and improve user browsing experience. If subscribed to our newsletter, we may send periodic updates about seasonal drops and exclusive sales.
            </p>
          </section>

          <section className="border-t border-ink-black/10 pt-4">
            <h2 className="font-serif text-xl font-bold text-ink-black mb-2">4. Data Sharing & Security</h2>
            <p>
              We do not sell, rent, or lease your personal information to third parties. We share limited operational data only with trusted service partners (such as courier logistics providers like BlueDart/Delhivery and payment processors) solely for completing your order.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
