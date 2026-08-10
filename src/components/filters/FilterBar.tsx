"use client";

import { useState } from "react";
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  selectedPrice?: number;
  onPriceChange?: (price: number) => void;
}

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
];

export function FilterBar({
  sortBy = "featured",
  onSortChange,
  selectedPrice,
  onPriceChange
}: FilterBarProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none relative z-30">
      
      {/* Sort Dropdown */}
      <div className="relative">
        <button 
          onClick={() => {
            setIsSortOpen(!isSortOpen);
            setActiveFilter(null);
          }}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[13px] font-bold uppercase tracking-[0.5px] whitespace-nowrap transition-all shadow-sm",
            isSortOpen ? "bg-ink-black text-white border-ink-black" : "border-ink-black/20 bg-white text-ink-black hover:bg-ink-black/5"
          )}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Sort: {SORT_OPTIONS.find(s => s.value === sortBy)?.label || "Featured"}
          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isSortOpen && "rotate-180")} />
        </button>

        {isSortOpen && (
          <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-ink-black/10 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  if (onSortChange) onSortChange(option.value);
                  setIsSortOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors",
                  sortBy === option.value ? "bg-ink-black/5 text-ink-black font-bold" : "text-ink-black/70 hover:bg-black/5 hover:text-ink-black"
                )}
              >
                <span>{option.label}</span>
                {sortBy === option.value && <Check className="w-3.5 h-3.5 text-ink-black" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Filter Buttons */}
      {["Under ₹3,000", "Under ₹5,000", "Under ₹10,000"].map((filter) => {
        const targetPrice = filter === "Under ₹3,000" ? 3000 : filter === "Under ₹5,000" ? 5000 : 10000;
        const isSelected = selectedPrice === targetPrice;

        return (
          <button
            key={filter}
            onClick={() => {
              if (onPriceChange) {
                onPriceChange(isSelected ? 0 : targetPrice);
              }
            }}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[13px] font-bold uppercase tracking-[0.5px] whitespace-nowrap transition-all shadow-sm",
              isSelected
                ? "border-ink-black bg-ink-black text-white"
                : "border-ink-black/15 bg-white text-ink-black hover:bg-ink-black/5"
            )}
          >
            {filter}
          </button>
        );
      })}

    </div>
  );
}
