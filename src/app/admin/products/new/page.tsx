"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/stores/useProductStore";
import { Product } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AddProductPage() {
  const router = useRouter();
  const addProduct = useProductStore((state) => state.addProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const rawCategory = formData.get("category") as string;
    
    // Auto-generate slug and proper category
    const slug = (formData.get("name") as string).toLowerCase().replace(/\s+/g, '-');
    const category = rawCategory.toUpperCase();
    
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      slug,
      name: formData.get("name") as string,
      category: category as any,
      price: Number(formData.get("price")),
      compareAtPrice: formData.get("compareAtPrice") ? Number(formData.get("compareAtPrice")) : undefined,
      images: [formData.get("imageUrl") as string || "https://placehold.co/800x1200/FFFFFF/111111?text=New+Product"],
      thumbnail: formData.get("imageUrl") as string || "https://placehold.co/600x900/FFFFFF/111111?text=New+Product",
      description: formData.get("description") as string,
      sizes: ["S", "M", "L"],
      colors: ["Default"],
      stock: Number(formData.get("stock") || 10),
      isNew: true,
      rating: 5.0,
      reviewCount: 0
    };

    addProduct(newProduct);
    
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/admin/products");
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div>
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        <p className="text-muted-foreground mt-2">Fill in the details to add a new product to your catalog.</p>
      </div>

      <div className="bg-background border border-border rounded-2xl shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold">Product Name</label>
            <input 
              required 
              type="text" 
              id="name" 
              name="name" 
              placeholder="e.g. Floral Embroidered Lehenga"
              className="h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-purple"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-sm font-semibold">Category</label>
              <select 
                required 
                id="category" 
                name="category"
                className="h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-purple"
              >
                <option value="SAREES">Sarees</option>
                <option value="LEHENGAS">Lehengas</option>
                <option value="KURTAS">Kurtas</option>
                <option value="DRESSES">Dresses</option>
                <option value="CO-ORD SETS">Co-ord Sets</option>
                <option value="DUPATTAS">Dupattas</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="stock" className="text-sm font-semibold">Stock Quantity</label>
              <input 
                required 
                type="number" 
                id="stock" 
                name="stock" 
                defaultValue={10}
                className="h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-purple"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="price" className="text-sm font-semibold">Price (₹)</label>
              <input 
                required 
                type="number" 
                id="price" 
                name="price" 
                placeholder="e.g. 2999"
                className="h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-purple"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="compareAtPrice" className="text-sm font-semibold">Compare at Price (Optional)</label>
              <input 
                type="number" 
                id="compareAtPrice" 
                name="compareAtPrice" 
                placeholder="e.g. 3999"
                className="h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-purple"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="imageUrl" className="text-sm font-semibold">Image URL (Optional)</label>
            <input 
              type="url" 
              id="imageUrl" 
              name="imageUrl" 
              placeholder="https://images.unsplash.com/photo-..."
              className="h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-purple"
            />
            <p className="text-xs text-muted-foreground">Leave empty to use a placeholder image.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-semibold">Description</label>
            <textarea 
              required 
              id="description" 
              name="description" 
              rows={4}
              placeholder="Detailed description of the product..."
              className="p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-brand-purple resize-none"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-border mt-2 flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="h-12 px-8 rounded-xl font-bold bg-foreground text-background hover:bg-foreground/90"
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
