"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ShoppingBag, PlusCircle, ArrowLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Add Product", href: "/admin/products/new", icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r border-border hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="font-serif text-xl font-bold tracking-widest uppercase">Admin Panel</h2>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href 
                  ? "bg-foreground text-background" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="md:hidden mb-6 flex overflow-x-auto gap-2 pb-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap",
                pathname === item.href 
                  ? "bg-foreground text-background" 
                  : "bg-background text-muted-foreground border border-border"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
          <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap bg-background text-muted-foreground border border-border">
            <ArrowLeft className="w-4 h-4" />
            Store
          </Link>
        </div>
        
        {children}
      </main>
    </div>
  );
}
