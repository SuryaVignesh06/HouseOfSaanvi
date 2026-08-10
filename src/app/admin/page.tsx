"use client";

import { useProductStore } from "@/stores/useProductStore";
import { Package, TrendingUp, IndianRupee, Tag } from "lucide-react";

export default function AdminDashboard() {
  const products = useProductStore((state) => state.products);

  const totalValue = products.reduce((acc, curr) => acc + curr.price, 0);

  const stats = [
    { title: "Total Products", value: products.length.toString(), icon: Package },
    { title: "Total Inventory Value", value: `₹${totalValue.toLocaleString('en-IN')}`, icon: IndianRupee },
    { title: "Categories", value: new Set(products.map(p => p.category)).size.toString(), icon: Tag },
    { title: "Avg. Product Price", value: `₹${Math.round(totalValue / products.length || 0).toLocaleString('en-IN')}`, icon: TrendingUp },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of your store's performance and inventory.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-background border border-border p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
              <div className="p-2 bg-brand-lavender/30 text-brand-purple rounded-lg">
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-background border border-border rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Recent Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Product Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3 rounded-tr-lg">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(-5).reverse().map((product) => (
                <tr key={product.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-4 font-medium">{product.name}</td>
                  <td className="px-4 py-4">{product.category}</td>
                  <td className="px-4 py-4">₹{product.price.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-4">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
