"use client";

import { useCartStore } from "@/stores/useCartStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CartDrawer({ children }: { children: React.ReactElement }) {
  const { items, removeItem, updateQuantity, getCartTotal, getCartCount } = useCartStore();

  return (
    <Sheet>
      <SheetTrigger render={children} />
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart ({getCartCount()})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold">Your cart is empty</h3>
              <p className="text-muted-foreground text-sm max-w-[200px]">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link href="/category/new-in" className="inline-flex h-8 items-center justify-center mt-4 rounded-xl px-4 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/80">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex gap-4 border-b border-border pb-4 last:border-0">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      fill
                      className="object-cover mix-blend-multiply"
                    />
                  </div>
                  
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-sm line-clamp-1 pr-4">{item.product.name}</h4>
                        <button 
                          onClick={() => removeItem(item.cartItemId)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Size: {item.size} | Color: {item.color}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-background hover:bg-muted transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-background hover:bg-muted transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <span className="font-bold text-sm">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-background">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-muted-foreground">Subtotal</span>
              <span className="font-bold text-lg">₹{getCartTotal().toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4 text-center">
              Shipping and taxes calculated at checkout.
            </p>
            <Link href="/checkout" className="inline-flex items-center justify-center w-full h-12 rounded-xl text-base font-bold bg-brand-purple text-primary-foreground hover:bg-brand-purple/90">
              PROCEED TO CHECKOUT
            </Link>
            <Link href="/cart" className="inline-flex items-center justify-center w-full h-12 rounded-xl mt-3 border border-border bg-background hover:bg-muted text-foreground">
              VIEW CART PAGE
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
