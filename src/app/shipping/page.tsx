"use client";

import Link from "next/link";
import { Truck, Clock, ShieldCheck, Globe, PackageCheck } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen pt-32 md:pt-40 pb-24 font-sans">
      <div className="container mx-auto px-6 md:px-12 max-w-[1100px]">
        
        <div className="mb-10 border-b border-[#EBE4DC] pb-8">
          <div className="flex items-center gap-2 text-[13px] text-ink-black/60 font-medium tracking-[0.5px] mb-3">
            <Link href="/" className="hover:text-ink-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ink-black font-semibold uppercase">Shipping Policy</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-ink-black font-bold">Shipping & Delivery Policy</h1>
          <p className="text-sm text-ink-black/70 mt-2">
            Complimentary insured express delivery across India for orders above ₹2,000.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-ink-black/10 rounded-[24px] p-6 text-center shadow-sm">
            <Truck className="w-10 h-10 text-ink-black mx-auto mb-3" />
            <h3 className="font-bold text-base text-ink-black mb-1">Free Express Shipping</h3>
            <p className="text-xs text-ink-black/60">Free delivery within India on orders over ₹2,000.</p>
          </div>
          <div className="bg-white border border-ink-black/10 rounded-[24px] p-6 text-center shadow-sm">
            <Clock className="w-10 h-10 text-ink-black mx-auto mb-3" />
            <h3 className="font-bold text-base text-ink-black mb-1">3-5 Day Delivery</h3>
            <p className="text-xs text-ink-black/60">Standard metro delivery timeline after dispatch.</p>
          </div>
          <div className="bg-white border border-ink-black/10 rounded-[24px] p-6 text-center shadow-sm">
            <Globe className="w-10 h-10 text-ink-black mx-auto mb-3" />
            <h3 className="font-bold text-base text-ink-black mb-1">Worldwide Shipping</h3>
            <p className="text-xs text-ink-black/60">DHL/FedEx express dispatch to over 120+ countries.</p>
          </div>
        </div>

        <div className="bg-white border border-ink-black/10 rounded-[32px] p-8 md:p-12 shadow-sm space-y-8 text-ink-black/80 leading-relaxed text-sm">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink-black mb-3">Domestic Shipping (India)</h2>
            <p>
              All orders are processed and dispatched from our Hyderabad atelier within 24 to 48 hours (excluding Sundays and national holidays). Pre-order and custom tailored couture pieces require 7-14 working days for handcrafting.
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1 text-xs">
              <li>Orders above ₹2,000: FREE Express Air Courier Delivery.</li>
              <li>Orders under ₹2,000: Flat ₹150 domestic shipping charge.</li>
              <li>Estimated Delivery Time: 2-4 days for metro cities, 4-6 days for rest of India.</li>
            </ul>
          </div>

          <div className="border-t border-ink-black/10 pt-6">
            <h2 className="font-serif text-2xl font-bold text-ink-black mb-3">Order Tracking</h2>
            <p>
              Once your shipment is dispatched, you will receive an automated email and SMS notification containing your AWB tracking link from our courier partners (Bluedart / Delhivery / DTDC).
            </p>
          </div>

          <div className="border-t border-ink-black/10 pt-6">
            <h2 className="font-serif text-2xl font-bold text-ink-black mb-3">International Delivery</h2>
            <p>
              We ship globally via DHL Express and FedEx International Priority. Shipping charges are calculated dynamically at checkout based on weight and country of destination. International transit time is typically 5 to 9 business days.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
