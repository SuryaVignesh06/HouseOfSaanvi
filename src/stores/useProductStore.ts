import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';
import { MOCK_PRODUCTS } from '@/data/mockProducts';

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (product: Product) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: MOCK_PRODUCTS,
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      removeProduct: (productId) => set((state) => ({ products: state.products.filter(p => p.id !== productId) })),
      updateProduct: (product) => set((state) => ({
        products: state.products.map(p => p.id === product.id ? product : p)
      })),
    }),
    {
      name: 'saanvi-product-storage-v2', // unique name bumped to invalidate cache
    }
  )
);
