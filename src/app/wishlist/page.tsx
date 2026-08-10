"use client";

import Link from "next/link";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { ProductCard } from "@/components/products/ProductCard";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";

export default function WishlistPage() {
  const { items, clearWishlist, removeItem } = useWishlistStore();
  const addItemToCart = useCartStore((state) => state.addItem);

  const handleMoveAllToCart = () => {
    items.forEach((product) => {
      addItemToCart(product, product.sizes[0] || "ONE SIZE", product.colors[0] || "Default");
    });
    clearWishlist();
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen pt-32 md:pt-40 pb-24 font-sans">
      <div className="container mx-auto px-6 md:px-12 max-w-[1450px]">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-[#EBE4DC] pb-8">
          <div>
            <div className="flex items-center gap-2 text-[13px] text-ink-black/60 font-medium tracking-[0.5px] mb-3">
              <Link href="/" className="hover:text-ink-black transition-colors">Home</Link>
              <span>/</span>
              <span className="text-ink-black font-semibold uppercase">My Wishlist</span>
            </div>
            <h1 className="font-serif text-[44px] md:text-[56px] text-ink-black leading-tight tracking-wide flex items-center gap-3">
              My Saved Wishlist
              <span className="text-2xl font-sans font-bold bg-ink-black text-white px-3 py-1 rounded-full">
                {items.length}
              </span>
            </h1>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="px-5 py-2.5 rounded-full border border-ink-black/20 text-xs font-bold uppercase tracking-wider text-ink-black/70 hover:text-red-600 hover:border-red-300 transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
              <button
                onClick={handleMoveAllToCart}
                className="px-6 py-2.5 rounded-full bg-ink-black text-white text-xs font-bold uppercase tracking-wider hover:bg-ink-black/90 transition-all flex items-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" /> Move All to Cart
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Items Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {items.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-28 text-center bg-white/60 rounded-[32px] border border-ink-black/10 shadow-sm max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-red-50 text-red-400 rounded-full flex items-center justify-center mb-5">
              <Heart className="w-10 h-10 fill-current opacity-75" />
            </div>
            <h2 className="font-serif text-3xl text-ink-black font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-ink-black/60 max-w-sm text-sm mb-8">
              Explore our handcrafted sarees, lehengas, and ethnic wear, and tap the heart icon to save your favorite items.
            </p>
            <Link 
              href="/category/new-in" 
              className="h-13 px-8 rounded-full bg-ink-black text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-ink-black/90 transition-all shadow-md"
            >
              EXPLORE NEW ARRIVALS
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
