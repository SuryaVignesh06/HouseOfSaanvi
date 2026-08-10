"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/stores/useCartStore";
import { ShieldCheck, CheckCircle2, CreditCard, Banknote, Smartphone, Lock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({
    firstName: "Ananya",
    lastName: "Sharma",
    email: "ananya.sharma@example.com",
    phone: "9876543210",
    address: "Flat 402, Lotus Heights, Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500033"
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 2000 || subtotal === 0 ? 0 : 150;
  const grandTotal = subtotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = "HOS-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="w-full bg-[#FAF8F5] min-h-screen pt-36 pb-24 font-sans">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-white border border-ink-black/10 rounded-[32px] p-8 md:p-12 shadow-xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              ORDER CONFIRMED
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-ink-black font-bold mt-4 mb-2">
              Thank You For Your Order!
            </h1>
            <p className="text-ink-black/70 text-sm mb-6">
              Your order <span className="font-bold text-ink-black">{orderId}</span> has been received and is being prepared with artisanal care.
            </p>

            <div className="bg-[#FAF8F5] rounded-2xl p-5 text-left text-xs space-y-2 mb-8 border border-ink-black/5">
              <div className="flex justify-between"><span className="text-ink-black/60">Shipping To:</span><span className="font-bold text-ink-black">{formData.firstName} {formData.lastName}</span></div>
              <div className="flex justify-between"><span className="text-ink-black/60">Address:</span><span className="font-semibold text-ink-black">{formData.address}, {formData.city}</span></div>
              <div className="flex justify-between"><span className="text-ink-black/60">Payment Method:</span><span className="font-bold uppercase text-ink-black">{paymentMethod}</span></div>
              <div className="flex justify-between"><span className="text-ink-black/60">Total Amount Paid:</span><span className="font-extrabold text-ink-black text-sm">₹{grandTotal.toLocaleString("en-IN")}</span></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/profile" 
                className="h-13 px-8 rounded-full bg-ink-black text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center hover:bg-ink-black/90 transition-all shadow-md"
              >
                VIEW IN MY ORDERS
              </Link>
              <Link 
                href="/category/all" 
                className="h-13 px-8 rounded-full border border-ink-black/30 text-ink-black text-xs font-bold uppercase tracking-wider flex items-center justify-center hover:bg-black/5 transition-all"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="w-full bg-[#FAF8F5] min-h-screen pt-36 pb-24 font-sans">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <div className="bg-white border border-ink-black/10 rounded-[32px] p-8 md:p-12 shadow-sm">
            <h1 className="font-serif text-3xl text-ink-black font-bold mb-3">Your Cart is Empty</h1>
            <p className="text-sm text-ink-black/60 mb-6">You need to add items to your cart before proceeding to checkout.</p>
            <Link href="/category/new-in" className="inline-flex h-12 px-8 rounded-full bg-ink-black text-white text-xs font-bold uppercase tracking-widest items-center justify-center shadow-md">
              BROWSE COLLECTIONS
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen pt-32 md:pt-40 pb-24 font-sans">
      <div className="container mx-auto px-6 md:px-12 max-w-[1300px]">
        
        <div className="flex items-center gap-2 mb-6 text-xs font-semibold text-ink-black/60">
          <Link href="/cart" className="hover:text-ink-black flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Return to Cart
          </Link>
        </div>

        <h1 className="font-serif text-4xl text-ink-black font-bold mb-8">Express Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Form */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Shipping Address */}
            <div className="bg-white border border-ink-black/10 rounded-[28px] p-6 md:p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-ink-black mb-6">1. Shipping Address</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-black/70 mb-1">First Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full h-12 px-4 border border-ink-black/20 rounded-xl text-sm font-medium outline-none focus:border-ink-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-black/70 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full h-12 px-4 border border-ink-black/20 rounded-xl text-sm font-medium outline-none focus:border-ink-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-black/70 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full h-12 px-4 border border-ink-black/20 rounded-xl text-sm font-medium outline-none focus:border-ink-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-black/70 mb-1">Street Address</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full h-12 px-4 border border-ink-black/20 rounded-xl text-sm font-medium outline-none focus:border-ink-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-black/70 mb-1">City</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full h-12 px-4 border border-ink-black/20 rounded-xl text-sm font-medium outline-none focus:border-ink-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-black/70 mb-1">Pincode</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    className="w-full h-12 px-4 border border-ink-black/20 rounded-xl text-sm font-medium outline-none focus:border-ink-black"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-ink-black/10 rounded-[28px] p-6 md:p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-ink-black mb-6">2. Select Payment Method</h2>
              
              <div className="space-y-3">
                <label 
                  onClick={() => setPaymentMethod("upi")}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all",
                    paymentMethod === "upi" ? "border-ink-black bg-ink-black/5 font-bold" : "border-ink-black/15 hover:border-ink-black/40"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-purple-700" />
                    <span className="text-sm">UPI / Instant QR (Google Pay, PhonePe, Paytm)</span>
                  </div>
                  <input type="radio" name="payment" checked={paymentMethod === "upi"} readOnly />
                </label>

                <label 
                  onClick={() => setPaymentMethod("card")}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all",
                    paymentMethod === "card" ? "border-ink-black bg-ink-black/5 font-bold" : "border-ink-black/15 hover:border-ink-black/40"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-700" />
                    <span className="text-sm">Credit / Debit Card (Visa, MasterCard, RuPay)</span>
                  </div>
                  <input type="radio" name="payment" checked={paymentMethod === "card"} readOnly />
                </label>

                <label 
                  onClick={() => setPaymentMethod("cod")}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all",
                    paymentMethod === "cod" ? "border-ink-black bg-ink-black/5 font-bold" : "border-ink-black/15 hover:border-ink-black/40"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-emerald-700" />
                    <span className="text-sm">Cash on Delivery (COD)</span>
                  </div>
                  <input type="radio" name="payment" checked={paymentMethod === "cod"} readOnly />
                </label>
              </div>
            </div>

          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-ink-black/10 rounded-[28px] p-6 md:p-8 shadow-sm sticky top-32">
              <h2 className="font-serif text-2xl font-bold text-ink-black mb-6">Order Summary</h2>

              <div className="divide-y divide-ink-black/10 max-h-72 overflow-y-auto mb-6 pr-1">
                {items.map((item) => (
                  <div key={item.cartItemId} className="py-3 flex gap-3 items-center">
                    <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image src={item.product.thumbnail} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-ink-black truncate">{item.product.name}</h4>
                      <p className="text-[11px] text-ink-black/60">Qty: {item.quantity} • {item.size} • {item.color}</p>
                    </div>
                    <span className="font-bold text-xs text-ink-black">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-ink-black/10 text-xs font-semibold">
                <div className="flex justify-between text-ink-black/70">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-ink-black/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-ink-black text-base font-extrabold pt-3 border-t border-ink-black/10">
                  <span>Grand Total</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 h-14 rounded-2xl bg-ink-black text-white text-xs font-bold uppercase tracking-widest hover:bg-ink-black/90 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" /> PLACE ORDER NOW
              </button>

              <div className="mt-4 text-center flex items-center justify-center gap-1.5 text-[11px] font-semibold text-ink-black/50">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 256-bit Encrypted SSL Payment
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
