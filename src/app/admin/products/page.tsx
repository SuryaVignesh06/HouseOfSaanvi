"use client";

import Link from "next/link";
import Image from "next/image";
import { useProductStore } from "@/stores/useProductStore";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminProductsPage() {
  const { products, removeProduct } = useProductStore();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-2">Manage your store's inventory and product listings.</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="rounded-xl flex items-center gap-2 font-semibold">
            <PlusCircle className="w-4 h-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-16 rounded-md overflow-hidden bg-white border border-border">
                        <Image
                          src={product.thumbnail}
                          alt={product.name}
                          fill
                          className="object-cover mix-blend-multiply"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{product.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-brand-lavender/40 text-brand-purple rounded-md text-xs font-semibold">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">₹{product.price.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                      {product.stock}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" title="Edit (Coming soon)">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if(confirm('Are you sure you want to delete this product?')) {
                            removeProduct(product.id);
                          }
                        }}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors" 
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No products found. Add your first product!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
