"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    category: "Orders & Customization",
    questions: [
      {
        q: "Can I customize the blouse stitching or length of a saree?",
        a: "Yes! We offer bespoke blouse stitching and alteration services. Once your order is placed, reach out to our WhatsApp concierge (+91 98765 43210) with your order ID and measurement chart."
      },
      {
        q: "How do I know what size to order?",
        a: "Each product page features a detailed Size Guide button with bust, waist, and hip measurements in inches. If you fall between sizes, we recommend ordering one size up as our garments include internal margin margins for alterations."
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship globally to over 120 countries using DHL Express and FedEx Priority. Express international transit typically takes 5 to 9 business days."
      },
      {
        q: "What are the domestic delivery timelines?",
        a: "In-stock orders within India are dispatched within 24-48 hours and delivered in 2 to 5 business days."
      }
    ]
  },
  {
    category: "Payments & Care",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards (Visa, MasterCard, RuPay, Amex), Net Banking, and Cash on Delivery (COD) for orders within India."
      },
      {
        q: "How should I care for my silk sarees and embroidered lehengas?",
        a: "We recommend dry cleaning only for all silk, chiffon, georgette, and embroidered garments. Always store your garments wrapped in breathable cotton or muslin covers."
      }
    ]
  }
];

export default function FaqsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = FAQ_ITEMS.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      item => 
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen pt-32 md:pt-40 pb-24 font-sans">
      <div className="container mx-auto px-6 md:px-12 max-w-[1100px]">
        
        {/* Header */}
        <div className="mb-10 text-center border-b border-[#EBE4DC] pb-10">
          <div className="flex items-center justify-center gap-2 text-[13px] text-ink-black/60 font-medium tracking-[0.5px] mb-3">
            <Link href="/" className="hover:text-ink-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ink-black font-semibold uppercase">FAQs</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-ink-black font-bold">Frequently Asked Questions</h1>
          <p className="text-sm text-ink-black/70 mt-2 max-w-lg mx-auto">
            Find quick answers to common questions about orders, sizing, shipping, and garment care.
          </p>

          {/* Search FAQ */}
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-ink-black/40" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. shipping, sizing, payment)..." 
              className="w-full h-12 pl-12 pr-4 bg-white border border-ink-black/20 rounded-full text-sm font-medium outline-none focus:border-ink-black shadow-sm"
            />
          </div>
        </div>

        {/* FAQs Accordion Groups */}
        <div className="space-y-8">
          {filteredFaqs.map((catGroup, idx) => (
            <div key={idx} className="bg-white border border-ink-black/10 rounded-[32px] p-6 md:p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-ink-black mb-4 border-b border-ink-black/10 pb-3">
                {catGroup.category}
              </h2>
              <Accordion className="w-full">
                {catGroup.questions.map((item, qIdx) => (
                  <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                    <AccordionTrigger className="font-bold text-sm text-ink-black text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs md:text-sm text-ink-black/75 leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-16 bg-white/60 rounded-[28px] border border-ink-black/10">
              <p className="text-sm text-ink-black/60 mb-4">No matching questions found for "{searchQuery}".</p>
              <Link href="/contact" className="px-6 py-2.5 bg-ink-black text-white text-xs font-bold uppercase rounded-full tracking-wider">
                Contact Concierge Support
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
