"use client";

import { useState } from "react";
import Link from "next/link";
import { RotateCcw, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ReturnsPage() {
  const [returnReqSubmitted, setReturnReqSubmitted] = useState(false);
  const [orderNum, setOrderNum] = useState("");

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReturnReqSubmitted(true);
    setTimeout(() => {
      setReturnReqSubmitted(false);
      setOrderNum("");
    }, 4000);
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen pt-32 md:pt-40 pb-24 font-sans">
      <div className="container mx-auto px-6 md:px-12 max-w-[1100px]">
        
        <div className="mb-10 border-b border-[#EBE4DC] pb-8">
          <div className="flex items-center gap-2 text-[13px] text-ink-black/60 font-medium tracking-[0.5px] mb-3">
            <Link href="/" className="hover:text-ink-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ink-black font-semibold uppercase">Returns Policy</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-ink-black font-bold">14-Day Returns & Exchanges</h1>
          <p className="text-sm text-ink-black/70 mt-2">
            Hassle-free door-to-door reverse pickup for exchanges and store credit returns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-7 bg-white border border-ink-black/10 rounded-[32px] p-8 md:p-10 shadow-sm space-y-6 text-sm text-ink-black/80">
            <h2 className="font-serif text-2xl font-bold text-ink-black">Return Guidelines</h2>
            <ul className="space-y-3 list-disc pl-5 text-xs md:text-sm leading-relaxed">
              <li>Items must be returned within 14 days of delivery date in their original unworn condition with all tags and security seals intact.</li>
              <li>Sarees with unstitched blouse pieces attached must not be cut or altered.</li>
              <li>Free reverse doorstep pickup is arranged for eligible pin codes across India.</li>
              <li>Refunds are issued as instant House of Saanvi Store Credit / Gift Voucher or original payment method within 3 business days of quality inspection.</li>
            </ul>

            <div className="pt-4 border-t border-ink-black/10">
              <h3 className="font-bold text-base text-ink-black mb-2">Non-Returnable Items</h3>
              <p className="text-xs text-ink-black/70 leading-relaxed">
                Custom tailored/altered garments, final clearance sale items, and intimate shapewear accessories are final sale and non-returnable.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-ink-black/10 rounded-[32px] p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-ink-black mb-4">Request a Return / Exchange</h2>
            <p className="text-xs text-ink-black/60 mb-6">Enter your order ID below to initiate a reverse doorstep pickup.</p>

            {returnReqSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center text-emerald-800 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h3 className="font-bold text-sm">Return Request Received!</h3>
                <p className="text-xs mt-1 text-emerald-700">Our courier will contact you within 24 hours to schedule pickup.</p>
              </div>
            ) : (
              <form onSubmit={handleReturnSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-black/70 mb-1">Order ID</label>
                  <input 
                    type="text" 
                    required
                    value={orderNum}
                    onChange={(e) => setOrderNum(e.target.value)}
                    placeholder="e.g. HOS-98231" 
                    className="w-full h-12 px-4 border border-ink-black/20 rounded-xl text-sm font-medium outline-none focus:border-ink-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-black/70 mb-1">Reason for Return</label>
                  <select className="w-full h-12 px-4 border border-ink-black/20 rounded-xl text-sm font-medium outline-none focus:border-ink-black bg-white">
                    <option>Size too small / large</option>
                    <option>Item received damaged</option>
                    <option>Color mismatch from photo</option>
                    <option>Changed mind</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  className="w-full h-13 rounded-2xl bg-ink-black text-white text-xs font-bold uppercase tracking-widest hover:bg-ink-black/90 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> SUBMIT RETURN REQUEST
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
