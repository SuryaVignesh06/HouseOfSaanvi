"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingBag, Search, User, Heart, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/stores/useCartStore';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { cn } from '@/lib/utils';

export function Header({ inFrame = false }: { inFrame?: boolean }) {
  const cartCount = useCartStore((state) => state.getCartCount());
  const wishlistCount = useWishlistStore((state) => state.getWishlistCount());
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/category/all?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isHomePageFixedHeader = pathname === "/" && !inFrame;

  return (
    <header className={cn(
      "z-50 w-full transition-all duration-500 pointer-events-none flex justify-center",
      inFrame ? "relative top-0 left-0 right-0 pt-1 md:pt-1.5 px-4 md:px-8" : "fixed top-0 left-0 right-0",
      isHomePageFixedHeader && !isScrolled ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
    )}>
      <div className={cn(
        "flex items-center justify-between transition-all duration-300 pointer-events-auto w-full",
        isScrolled
          ? "bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-full px-8 py-2.5 max-w-[1100px] mt-3 mx-4"
          : inFrame 
            ? "bg-transparent border-0 px-2 md:px-4 py-1"
            : "max-w-[1400px] bg-white/90 backdrop-blur-md border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.05)] px-6 lg:px-8 py-2 mt-4 mx-4 rounded-[24px]"
      )}>
        
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center group">
            <div className={cn(
              "relative transition-all duration-300 group-hover:scale-[1.02]",
              isScrolled 
                ? "w-[140px] h-[44px]" 
                : inFrame
                  ? "w-[240px] h-[74px] md:w-[290px] md:h-[90px] lg:w-[330px] lg:h-[100px]"
                  : "w-[180px] h-[54px] md:h-[60px]"
            )}>
              <Image 
                src="/logo.png" 
                alt="House of Saanvi" 
                fill
                priority
                className={cn(
                  "object-contain object-left filter transition-all duration-300",
                  isScrolled 
                    ? "brightness-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" 
                    : "drop-shadow-[0_6px_20px_rgba(20,10,35,0.5)] brightness-95"
                )}
              />
            </div>
          </Link>
        </div>

        {/* Right: Floating Navigation Links + Icons */}
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10 relative z-10">
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-10">
            <Link href="/" className="font-sans font-medium text-[15px] md:text-[16px] uppercase tracking-[0.5px] text-ink-black hover:text-ink-black/70 transition-colors whitespace-nowrap drop-shadow-sm">
              Home
            </Link>
            <Link href="/category/new-in" className="font-sans font-medium text-[15px] md:text-[16px] uppercase tracking-[0.5px] text-ink-black hover:text-ink-black/70 transition-colors whitespace-nowrap drop-shadow-sm">
              New Arrival
            </Link>
            
            {/* Explore Dropdown Container with Glassmorphism */}
            <div className="relative group/explore py-2">
              <button 
                onClick={() => setIsExploreOpen(!isExploreOpen)}
                className="font-sans font-medium text-[15px] md:text-[16px] uppercase tracking-[0.5px] text-ink-black hover:text-ink-black/70 transition-colors whitespace-nowrap flex items-center gap-1 drop-shadow-sm"
              >
                Explore
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isExploreOpen && "rotate-180")} />
              </button>
              {/* Glassmorphic Dropdown Menu */}
              <div className={cn(
                "absolute top-full right-0 pt-2 transition-all duration-250 ease-out z-50",
                isExploreOpen 
                  ? "opacity-100 translate-y-0 pointer-events-auto" 
                  : "opacity-0 translate-y-2 pointer-events-none group-hover/explore:opacity-100 group-hover/explore:translate-y-0 group-hover/explore:pointer-events-auto"
              )}>
                <div className="bg-white/90 backdrop-blur-xl rounded-[20px] shadow-[0_14px_40px_rgba(30,25,35,0.14)] border border-white/60 p-6 min-w-[210px] flex flex-col gap-3.5">
                  <Link href="/category/all" onClick={() => setIsExploreOpen(false)} className="font-sans text-[15px] font-medium text-ink-black/90 hover:text-ink-black hover:translate-x-1 transition-all">All Collections</Link>
                  <Link href="/category/sarees" onClick={() => setIsExploreOpen(false)} className="font-sans text-[15px] font-medium text-ink-black/90 hover:text-ink-black hover:translate-x-1 transition-all">Sarees</Link>
                  <Link href="/category/lehengas" onClick={() => setIsExploreOpen(false)} className="font-sans text-[15px] font-medium text-ink-black/90 hover:text-ink-black hover:translate-x-1 transition-all">Lehengas</Link>
                  <Link href="/category/kurtas" onClick={() => setIsExploreOpen(false)} className="font-sans text-[15px] font-medium text-ink-black/90 hover:text-ink-black hover:translate-x-1 transition-all">Kurtas</Link>
                  <Link href="/category/dresses" onClick={() => setIsExploreOpen(false)} className="font-sans text-[15px] font-medium text-ink-black/90 hover:text-ink-black hover:translate-x-1 transition-all">Dresses</Link>
                  <Link href="/category/dupattas" onClick={() => setIsExploreOpen(false)} className="font-sans text-[15px] font-medium text-ink-black/90 hover:text-ink-black hover:translate-x-1 transition-all">Dupattas</Link>
                  <Link href="/category/coord-sets" onClick={() => setIsExploreOpen(false)} className="font-sans text-[15px] font-medium text-ink-black/90 hover:text-ink-black hover:translate-x-1 transition-all">Co-ord Sets</Link>
                </div>
              </div>
            </div>
            
            <Link href="/category/sale" className="font-sans font-medium text-[15px] md:text-[16px] uppercase tracking-[0.5px] text-ink-black hover:text-ink-black/70 transition-colors whitespace-nowrap drop-shadow-sm">
              Sales
            </Link>
          </nav>

          {/* Icons Group */}
          <div className="flex items-center gap-[8px] md:gap-[12px]">
            <form onSubmit={handleSearchSubmit} className="flex items-center relative">
              {isSearchOpen && (
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sarees, kurtas..." 
                  className="bg-white/90 backdrop-blur-md border border-ink-black/20 rounded-full outline-none font-sans text-[13px] px-3.5 py-1.5 w-[160px] md:w-[200px] mr-2 shadow-md transition-all animate-in fade-in slide-in-from-right-4 duration-300"
                  autoFocus
                />
              )}
              <button 
                type="button"
                className="text-ink-black hover:bg-white/40 p-[8px] rounded-[10px] transition-all" 
                aria-label="Search"
                onClick={() => {
                  if (isSearchOpen && searchQuery.trim()) {
                    router.push(`/category/all?search=${encodeURIComponent(searchQuery.trim())}`);
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  } else {
                    setIsSearchOpen(!isSearchOpen);
                  }
                }}
              >
                <Search size={19} strokeWidth={2} />
              </button>
            </form>

            <Link href="/profile" className="hidden sm:block text-ink-black hover:bg-white/40 p-[8px] rounded-[10px] transition-all" aria-label="Profile">
               <User size={19} strokeWidth={2} />
            </Link>
            
            <Link href="/wishlist" className="relative hidden sm:flex items-center justify-center text-ink-black hover:bg-white/40 p-[8px] rounded-[10px] transition-all" aria-label="Wishlist">
               <Heart size={19} strokeWidth={2} />
               {wishlistCount > 0 && (
                 <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center font-sans">
                   {wishlistCount}
                 </span>
               )}
            </Link>

            <CartDrawer>
              <button className="relative flex items-center justify-center text-ink-black hover:bg-white/40 p-[8px] rounded-[10px] transition-all" aria-label="Cart">
                <ShoppingBag size={19} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-ink-black text-pure-white text-[10px] font-bold rounded-full flex items-center justify-center font-sans">
                    {cartCount}
                  </span>
                )}
              </button>
            </CartDrawer>
          </div>
        </div>

      </div>
    </header>
  );
}
