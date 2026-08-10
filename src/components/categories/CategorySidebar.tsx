"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { name: "ALL COLLECTIONS", href: "/category/all" },
  { name: "NEW IN", href: "/category/new-in" },
  { name: "BEST SELLERS", href: "/category/best-sellers" },
  { name: "FESTIVE DRAPES", href: "/category/festive" },
  { name: "SAREES", href: "/category/sarees" },
  { name: "LEHENGAS", href: "/category/lehengas" },
  { name: "KURTAS", href: "/category/kurtas" },
  { name: "DRESSES", href: "/category/dresses" },
  { name: "CO-ORD SETS", href: "/category/coord-sets" },
  { name: "DUPATTAS", href: "/category/dupattas" },
  { name: "SALE", href: "/category/sale" },
];

export function CategorySidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-72 flex-shrink-0 sticky top-[120px] self-start font-sans">
      <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
        {CATEGORIES.map((category) => {
          const isActive = pathname === category.href || 
            (category.href !== "/" && pathname.startsWith(category.href));

          return (
            <Link
              key={category.name}
              href={category.href}
              scroll={false}
              className={cn(
                "flex items-center justify-between px-[24px] h-[48px] rounded-full text-[13px] font-semibold tracking-[1.5px] uppercase transition-colors whitespace-nowrap md:whitespace-normal border border-transparent",
                isActive
                  ? "bg-ink-black text-pure-white"
                  : "bg-transparent text-ink-black hover:bg-lavender-300/30"
              )}
            >
              <span>{category.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
