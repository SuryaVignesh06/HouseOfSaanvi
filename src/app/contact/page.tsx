"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen pt-32 md:pt-40 pb-24 font-sans">
      <div className="container mx-auto px-6 md:px-12 max-w-[1300px]">
        
        {/* Header */}
        <div className="mb-12 border-b border-[#EBE4DC] pb-8">
          <div className="flex items-center gap-2 text-[13px] text-ink-black/60 font-medium tracking-[0.5px] mb-3">
            <Link href="/" className="hover:text-ink-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ink-black font-semibold uppercase">Contact Us</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-ink-black font-bold">Client Concierge & Support</h1>
          <p className="text-sm text-ink-black/70 mt-2 max-w-xl">
            We are here to assist with custom styling inquiries, order tracking, boutique appointments, or sizing advice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-ink-black/10 rounded-[28px] p-6 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-purple-50 text-purple-900 rounded-2xl">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-ink-black">Email Client Concierge</h3>
                <p className="text-xs text-ink-black/60 mt-1">For general inquiries and order updates</p>
                <a href="mailto:support@houseofsaanvi.com" className="text-sm font-bold text-ink-black mt-2 inline-block hover:underline">
                  support@houseofsaanvi.com
                </a>
              </div>
            </div>

            <div className="bg-white border border-ink-black/10 rounded-[28px] p-6 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-amber-50 text-amber-900 rounded-2xl">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-ink-black">WhatsApp & Call Support</h3>
                <p className="text-xs text-ink-black/60 mt-1">Available Mon - Sat, 10 AM to 7 PM IST</p>
                <a href="tel:+919876543210" className="text-sm font-bold text-ink-black mt-2 inline-block hover:underline">
                  +91 98765 43210
                </a>
              </div>
            </div>

            <div className="bg-white border border-ink-black/10 rounded-[28px] p-6 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-2xl">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-ink-black">Flagship Boutique</h3>
                <p className="text-xs text-ink-black/60 mt-1 leading-relaxed">
                  House of Saanvi Atelier, Road No. 36,<br/>
                  Jubilee Hills, Hyderabad, Telangana 500033
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-ink-black/10 rounded-[32px] p-8 md:p-10 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-ink-black mb-6">Send Us a Message</h2>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center text-emerald-800 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg">Thank You for Contacting Us!</h3>
                  <p className="text-xs mt-1 text-emerald-700">Our concierge team will respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink-black/70 mb-1">Your Name</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. Priyanjali Roy" 
                        className="w-full h-12 px-4 border border-ink-black/20 rounded-xl text-sm font-medium outline-none focus:border-ink-black" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink-black/70 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="e.g. name@example.com" 
                        className="w-full h-12 px-4 border border-ink-black/20 rounded-xl text-sm font-medium outline-none focus:border-ink-black" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-black/70 mb-1">Subject</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="e.g. Sizing Advice / Custom Fitting" 
                      className="w-full h-12 px-4 border border-ink-black/20 rounded-xl text-sm font-medium outline-none focus:border-ink-black" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-black/70 mb-1">Message</label>
                    <textarea 
                      required 
                      rows={5} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Write your query here..." 
                      className="w-full p-4 border border-ink-black/20 rounded-xl text-sm font-medium outline-none focus:border-ink-black" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="h-13 px-8 rounded-2xl bg-ink-black text-white text-xs font-bold uppercase tracking-widest hover:bg-ink-black/90 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> SUBMIT INQUIRY
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
