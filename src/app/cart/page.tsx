"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/useCartStore";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-6">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link href="/category/new-in" className="inline-flex h-12 items-center justify-center rounded-xl px-8 text-base font-bold bg-foreground text-background hover:bg-foreground/90 transition-colors">
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center gap-2 mb-8">
        <Link href="/" className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 uppercase tracking-tight">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-2/3 flex flex-col gap-6">
          {items.map((item) => (
            <div key={item.cartItemId} className="flex flex-col sm:flex-row gap-6 p-4 border border-border rounded-[20px] bg-background">
              <div className="relative w-full sm:w-32 h-40 rounded-xl overflow-hidden bg-white flex-shrink-0">
                <Image
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  fill
                  className="object-cover mix-blend-multiply"
                />
              </div>
              
              <div className="flex flex-1 flex-col justify-between py-2">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-2">{item.product.name}</h3>
                    <div className="text-sm text-muted-foreground mt-2 space-y-1">
                      <p>Size: <span className="font-medium text-foreground">{item.size}</span></p>
                      <p>Color: <span className="font-medium text-foreground">{item.color}</span></p>
                    </div>
                  </div>
                  <span className="font-bold text-lg whitespace-nowrap">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-border rounded-lg overflow-hidden h-10">
                    <button 
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="w-10 h-full flex items-center justify-center bg-background hover:bg-muted transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="w-10 h-full flex items-center justify-center bg-background hover:bg-muted transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.cartItemId)}
                    className="text-muted-foreground hover:text-destructive flex items-center gap-1 text-sm font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-1/3">
          <div className="border border-border rounded-[24px] p-6 bg-brand-lavender/30 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm font-medium">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl">₹{getCartTotal().toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <Link href="/checkout" className="flex items-center justify-center w-full h-14 rounded-xl text-base font-bold bg-brand-purple text-primary-foreground hover:bg-brand-purple/90 shadow-lg hover:scale-105 transition-transform duration-300">
              PROCEED TO CHECKOUT
            </Link>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>🔒 Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
