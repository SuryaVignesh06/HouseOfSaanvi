"use client";

import { use, useState, useMemo } from "react";
import { notFound, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CategorySidebar } from "@/components/categories/CategorySidebar";
import { FilterBar } from "@/components/filters/FilterBar";
import { ProductCard } from "@/components/products/ProductCard";
import { useProductStore } from "@/stores/useProductStore";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  
  const allProducts = useProductStore((state) => state.products);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  
  // Format slug for display
  const categoryName = slug === "all" 
    ? "All Collections"
    : slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

  // Validate category
  const validCategories = [
    "all",
    "new-in",
    "best-sellers",
    "festive",
    "sarees",
    "lehengas",
    "kurtas",
    "dresses",
    "coord-sets",
    "dupattas",
    "sale"
  ];

  if (!validCategories.includes(slug)) {
    notFound();
  }

  // Filter products by category & search query
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (slug === "new-in") {
      result = result.filter((p) => p.isNew);
    } else if (slug === "sale") {
      result = result.filter((p) => p.compareAtPrice);
    } else if (slug === "best-sellers") {
      result = result.filter((p) => p.isBestSeller || (p.rating ?? 0) >= 4.5);
    } else if (slug === "festive") {
      result = result.filter((p) => p.occasion?.toLowerCase().includes("festive") || p.category === "SAREES" || p.category === "LEHENGAS");
    } else if (slug !== "all") {
      const formattedSlug = slug.replace("-", " ").toLowerCase();
      result = result.filter((p) => p.category.toLowerCase() === formattedSlug);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Price filter
    if (selectedPrice > 0) {
      result = result.filter((p) => p.price <= selectedPrice);
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [allProducts, slug, searchQuery, selectedPrice, sortBy]);

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen pt-32 md:pt-40 pb-24 font-sans">
      <div className="container mx-auto px-6 md:px-12 max-w-[1450px]">
        
        {/* Breadcrumb & Header Section */}
        <div className="flex flex-col gap-4 mb-10 border-b border-[#EBE4DC] pb-8">
          <div className="flex items-center gap-2 text-[13px] text-ink-black/60 font-medium tracking-[0.5px]">
            <Link href="/" className="hover:text-ink-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ink-black font-semibold uppercase">{categoryName}</span>
            {searchQuery && (
              <>
                <span>/</span>
                <span className="text-ink-black/80 italic">Search: "{searchQuery}"</span>
              </>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-[44px] md:text-[60px] text-ink-black leading-tight tracking-wide">
                {searchQuery ? `Search Results for "${searchQuery}"` : categoryName}
              </h1>
              <p className="text-[14px] text-ink-black/60 font-medium mt-1">
                Showing {filteredProducts.length} curated pieces
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar & Main Grid */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-[260px] flex-shrink-0">
            <CategorySidebar />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            
            {/* Filter Bar */}
            <div className="mb-10">
              <FilterBar 
                sortBy={sortBy}
                onSortChange={setSortBy}
                selectedPrice={selectedPrice}
                onPriceChange={setSelectedPrice}
              />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white/50 rounded-[24px] border border-border/50">
                <span className="text-5xl mb-4">🛍️</span>
                <h2 className="font-serif text-2xl text-ink-black mb-2">No products found</h2>
                <p className="text-text-muted max-w-md text-sm">
                  We couldn't find any products matching your criteria. Try adjusting your filters or exploring our other collections.
                </p>
                <Link href="/category/all" className="mt-6 px-6 py-2.5 bg-ink-black text-white text-xs font-bold uppercase rounded-full tracking-wider hover:bg-ink-black/80 transition-colors">
                  View All Products
                </Link>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
