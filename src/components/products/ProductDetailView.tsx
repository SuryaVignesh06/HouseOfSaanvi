"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Heart, Star, ShoppingBag, Check, X, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useProductStore } from "@/stores/useProductStore";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { ProductSize } from "@/types";
import { cn } from "@/lib/utils";

export function ProductDetailView({ slug }: { slug: string }) {
  const products = useProductStore((state) => state.products);
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0] || "ONE SIZE");
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || "Default");
  const [isAdded, setIsAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const addItemToCart = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));

  const handleAddToCart = () => {
    addItemToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-28 md:pt-36 max-w-7xl font-sans">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-3/5 grid grid-cols-2 gap-4">
          <div className="col-span-2 relative aspect-[3/4] w-full rounded-[20px] overflow-hidden bg-white shadow-sm">
            <Image
              src={product.images[0] || product.thumbnail}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {product.images.slice(1).map((image, index) => (
            <div key={index} className="relative aspect-[3/4] w-full rounded-[16px] overflow-hidden bg-white shadow-sm">
              <Image
                src={image}
                alt={`${product.name} - ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Right: Product Details */}
        <div className="w-full lg:w-2/5 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-3 text-ink-black">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full text-xs font-semibold">
                <Star className="w-4 h-4 fill-current text-amber-500" />
                <span className="text-ink-black">{product.rating}</span>
                <span className="text-ink-black/60">({product.reviewCount} reviews)</span>
              </div>
              {product.isNew && (
                <span className="text-[11px] font-bold tracking-wider uppercase bg-ink-black text-white px-2.5 py-1 rounded-full">
                  New Arrival
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-ink-black">₹{product.price.toLocaleString('en-IN')}</span>
              {product.compareAtPrice && (
                <span className="text-ink-black/40 line-through text-lg">
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <p className="text-ink-black/75 text-sm leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-5 border-t border-b border-ink-black/10 py-5">
            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <h3 className="font-bold text-xs uppercase tracking-wider text-ink-black">Select Size</h3>
                <button 
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs font-medium underline text-ink-black/70 hover:text-ink-black flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" /> Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)} 
                    className={cn(
                      "min-w-[48px] h-12 px-4 rounded-xl border text-sm font-semibold transition-all duration-200",
                      selectedSize === size
                        ? "border-ink-black bg-ink-black text-white shadow-md scale-[1.02]"
                        : "border-ink-black/20 bg-white text-ink-black hover:border-ink-black/50"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-ink-black mb-2.5">Select Color</h3>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((color) => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "px-4 h-11 rounded-xl border text-sm font-semibold transition-all duration-200 flex items-center gap-2",
                      selectedColor === color
                        ? "border-ink-black bg-ink-black text-white shadow-md scale-[1.02]"
                        : "border-ink-black/20 bg-white text-ink-black hover:border-ink-black/50"
                    )}
                  >
                    <span>{color}</span>
                    {selectedColor === color && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <Button 
              onClick={handleAddToCart}
              className={cn(
                "flex-1 rounded-2xl h-14 text-base font-bold tracking-wider uppercase transition-all duration-300 shadow-md",
                isAdded 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                  : "bg-ink-black text-white hover:bg-ink-black/90"
              )}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  ADDED TO CART
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  ADD TO CART
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => toggleWishlist(product)}
              className={cn(
                "w-14 h-14 rounded-2xl border-ink-black/20 flex-shrink-0 transition-all duration-200",
                isInWishlist ? "text-red-500 border-red-500 bg-red-50" : "hover:border-ink-black text-ink-black"
              )}
            >
              <Heart className={cn("w-5 h-5", isInWishlist && "fill-current text-red-500")} />
            </Button>
          </div>

          <Accordion className="w-full mt-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold text-sm">Description & Style Notes</AccordionTrigger>
              <AccordionContent className="text-ink-black/70 text-sm leading-relaxed">
                {product.description}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold text-sm">Fabric & Care</AccordionTrigger>
              <AccordionContent className="text-ink-black/70 text-sm leading-relaxed">
                Fabric: {product.fabric || "Premium heritage weave"}.<br/>
                Dry clean only. Store in muslin cover away from direct sunlight.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold text-sm">Shipping & Returns</AccordionTrigger>
              <AccordionContent className="text-ink-black/70 text-sm leading-relaxed">
                Complimentary standard express shipping within India. Ships within 24-48 hours. Easy 14-day hassle-free return and exchange policy.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-lg w-full p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-5 right-5 p-2 text-ink-black/50 hover:text-ink-black rounded-full hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold mb-1 text-ink-black">Size Guide</h3>
            <p className="text-xs text-ink-black/60 mb-6">Standard sizing measurements in inches (in)</p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-muted uppercase font-bold text-ink-black">
                  <tr>
                    <th className="p-3 rounded-l-lg">Size</th>
                    <th className="p-3">Bust</th>
                    <th className="p-3">Waist</th>
                    <th className="p-3 rounded-r-lg">Hip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-medium text-ink-black/80">
                  <tr><td className="p-3 font-bold">XS</td><td className="p-3">32</td><td className="p-3">26</td><td className="p-3">36</td></tr>
                  <tr><td className="p-3 font-bold">S</td><td className="p-3">34</td><td className="p-3">28</td><td className="p-3">38</td></tr>
                  <tr><td className="p-3 font-bold">M</td><td className="p-3">36</td><td className="p-3">30</td><td className="p-3">40</td></tr>
                  <tr><td className="p-3 font-bold">L</td><td className="p-3">38</td><td className="p-3">32</td><td className="p-3">42</td></tr>
                  <tr><td className="p-3 font-bold">XL</td><td className="p-3">40</td><td className="p-3">34</td><td className="p-3">44</td></tr>
                  <tr><td className="p-3 font-bold">XXL</td><td className="p-3">42</td><td className="p-3">36</td><td className="p-3">46</td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-ink-black/50 mt-4 italic">
              * Note: Saree drape items are standard ONE SIZE / FREE SIZE.
            </p>

            <Button 
              onClick={() => setShowSizeGuide(false)}
              className="w-full mt-6 rounded-xl bg-ink-black text-white hover:bg-ink-black/90 font-bold"
            >
              GOT IT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
