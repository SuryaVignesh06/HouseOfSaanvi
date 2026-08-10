"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <div className="group relative flex flex-col w-full font-sans cursor-pointer">
      
      {/* Top: Image Container */}
      <Link href={`/product/${product.slug}`} className="block relative w-full aspect-[4/5] bg-[#F7F5F4] rounded-[18px] overflow-hidden mb-4">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      
      <button 
        onClick={handleWishlistClick}
        className={cn(
          "absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center transition-all duration-300 z-10 hover:scale-110",
          isInWishlist ? "text-red-500 bg-white" : "text-ink-black/40 hover:text-red-500"
        )} 
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
         <Heart size={16} strokeWidth={2} className={cn(isInWishlist && "fill-current text-red-500")} />
      </button>

      {/* Bottom: Content */}
      <Link href={`/product/${product.slug}`} className="flex flex-col flex-1 px-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-sans font-bold text-[15px] md:text-[16px] leading-[1.3] text-ink-black line-clamp-1">
            {product.name}
          </h3>
          <span className="font-sans font-extrabold text-[15px] md:text-[16px] leading-[1.3] text-ink-black whitespace-nowrap">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
        </div>
        <p className="font-sans font-normal text-[13px] text-text-muted mt-0.5">
          {product.category}
        </p>
      </Link>
      
    </div>
  );
}
