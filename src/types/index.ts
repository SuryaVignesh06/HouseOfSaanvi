export type ProductCategory =
  | "SAREES"
  | "LEHENGAS"
  | "KURTAS"
  | "DRESSES"
  | "CO-ORD SETS"
  | "DUPATTAS"
  | "SALE"
  | "NEW IN";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "ONE SIZE";

export type ProductColor = string;

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  images: string[];
  thumbnail: string;
  description: string;
  sizes: ProductSize[];
  colors: ProductColor[];
  fabric?: string;
  occasion?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  stock: number;
  rating?: number;
  reviewCount?: number;
}
