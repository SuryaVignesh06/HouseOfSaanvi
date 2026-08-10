"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Package, MapPin, Heart, LogOut, CheckCircle, Clock } from "lucide-react";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { cn } from "@/lib/utils";

const MOCK_ORDERS = [
  {
    id: "HOS-98231",
    date: "August 2, 2026",
    status: "Delivered",
    total: 11598,
    items: [
      { name: "Lavender Chiffon Saree", price: 2599, size: "ONE SIZE", color: "Lavender" },
      { name: "Floral Embroidered Lehenga", price: 8999, size: "M", color: "Pink" }
    ]
  },
  {
    id: "HOS-96410",
    date: "July 18, 2026",
    status: "Delivered",
    total: 2299,
    items: [
      { name: "Embroidered Kurta Set", price: 2299, size: "L", color: "Mint Green" }
    ]
  }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "details">("orders");
  const wishlistCount = useWishlistStore((state) => state.getWishlistCount());

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen pt-32 md:pt-40 pb-24 font-sans">
      <div className="container mx-auto px-6 md:px-12 max-w-[1250px]">
        
        {/* Header */}
        <div className="mb-10 border-b border-[#EBE4DC] pb-8">
          <div className="flex items-center gap-2 text-[13px] text-ink-black/60 font-medium tracking-[0.5px] mb-3">
            <Link href="/" className="hover:text-ink-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ink-black font-semibold uppercase">Account Profile</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-ink-black text-white flex items-center justify-center text-xl font-bold font-serif shadow-md">
                SA
              </div>
              <div>
                <h1 className="font-serif text-3xl md:text-4xl text-ink-black font-bold">Welcome back, Ananya</h1>
                <p className="text-sm text-ink-black/60 font-medium">ananya.sharma@example.com • Member since 2025</p>
              </div>
            </div>
            <Link 
              href="/wishlist" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-ink-black/20 bg-white text-xs font-bold uppercase tracking-wider text-ink-black hover:bg-ink-black hover:text-white transition-all shadow-sm"
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" /> Wishlist ({wishlistCount})
            </Link>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            <button
              onClick={() => setActiveTab("orders")}
              className={cn(
                "flex items-center gap-3 px-5 h-13 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all text-left",
                activeTab === "orders" ? "bg-ink-black text-white shadow-md" : "bg-white text-ink-black hover:bg-black/5"
              )}
            >
              <Package className="w-4 h-4" /> Order History
            </button>
            <button
              onClick={() => setActiveTab("addresses")}
              className={cn(
                "flex items-center gap-3 px-5 h-13 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all text-left",
                activeTab === "addresses" ? "bg-ink-black text-white shadow-md" : "bg-white text-ink-black hover:bg-black/5"
              )}
            >
              <MapPin className="w-4 h-4" /> Saved Addresses
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={cn(
                "flex items-center gap-3 px-5 h-13 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all text-left",
                activeTab === "details" ? "bg-ink-black text-white shadow-md" : "bg-white text-ink-black hover:bg-black/5"
              )}
            >
              <User className="w-4 h-4" /> Personal Details
            </button>
            <button
              onClick={() => alert("Logged out successfully!")}
              className="flex items-center gap-3 px-5 h-13 rounded-2xl text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 hover:bg-red-100 transition-all text-left mt-4"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          {/* Main Tab Content */}
          <div className="lg:col-span-9">
            {activeTab === "orders" && (
              <div className="flex flex-col gap-6">
                <h2 className="font-serif text-2xl font-bold text-ink-black">Recent Orders</h2>
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="bg-white border border-ink-black/10 rounded-[24px] p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between pb-4 border-b border-ink-black/10 gap-3">
                      <div>
                        <span className="font-bold text-sm text-ink-black">{order.id}</span>
                        <p className="text-xs text-ink-black/60 mt-0.5">Placed on {order.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle className="w-3.5 h-3.5" /> {order.status}
                        </span>
                        <span className="font-extrabold text-base text-ink-black">₹{order.total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    <div className="divide-y divide-ink-black/5 mt-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-3 flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-ink-black">{item.name}</span>
                            <p className="text-ink-black/60 mt-0.5">Size: {item.size} • Color: {item.color}</p>
                          </div>
                          <span className="font-semibold text-ink-black">₹{item.price.toLocaleString("en-IN")}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 mt-2 border-t border-ink-black/5 flex justify-end">
                      <Link 
                        href="/contact" 
                        className="text-xs font-bold underline text-ink-black/70 hover:text-ink-black"
                      >
                        Need Help With Order?
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-serif text-2xl font-bold text-ink-black">Saved Delivery Addresses</h2>
                  <button onClick={() => alert("Address manager opened")} className="px-4 py-2 bg-ink-black text-white text-xs font-bold rounded-xl uppercase tracking-wider">
                    + Add New Address
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-ink-black rounded-[24px] p-6 shadow-sm relative">
                    <span className="absolute top-4 right-4 bg-ink-black text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">DEFAULT</span>
                    <h3 className="font-bold text-sm text-ink-black mb-1">Ananya Sharma</h3>
                    <p className="text-xs text-ink-black/70 leading-relaxed">
                      Flat 402, Lotus Heights, Jubilee Hills<br/>
                      Road No. 36, Hyderabad, Telangana - 500033<br/>
                      Phone: +91 98765 43210
                    </p>
                    <div className="mt-4 pt-3 border-t border-ink-black/10 flex gap-3 text-xs font-bold text-ink-black/70">
                      <button onClick={() => alert("Editing default address")} className="hover:underline">Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="bg-white border border-ink-black/10 rounded-[24px] p-6 md:p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-ink-black mb-6">Personal Profile Details</h2>
                <form onSubmit={(e) => { e.preventDefault(); alert("Profile updated!"); }} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-black/70 mb-1">Full Name</label>
                    <input type="text" defaultValue="Ananya Sharma" className="w-full h-11 px-4 border border-ink-black/20 rounded-xl text-sm font-medium outline-none focus:border-ink-black" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-black/70 mb-1">Email Address</label>
                    <input type="email" defaultValue="ananya.sharma@example.com" className="w-full h-11 px-4 border border-ink-black/20 rounded-xl text-sm font-medium outline-none focus:border-ink-black" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-black/70 mb-1">Phone Number</label>
                    <input type="tel" defaultValue="+91 98765 43210" className="w-full h-11 px-4 border border-ink-black/20 rounded-xl text-sm font-medium outline-none focus:border-ink-black" />
                  </div>
                  <button type="submit" className="h-12 px-6 rounded-xl bg-ink-black text-white text-xs font-bold uppercase tracking-widest hover:bg-ink-black/90 transition-all shadow-md">
                    SAVE CHANGES
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
