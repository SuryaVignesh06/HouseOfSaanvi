import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const currentItems = get().items;
        if (!currentItems.find((item) => item.id === product.id)) {
          set({ items: [...currentItems, product] });
        }
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId)
        }));
      },
      toggleItem: (product) => {
        const currentItems = get().items;
        const exists = currentItems.some((item) => item.id === product.id);
        if (exists) {
          set({ items: currentItems.filter((item) => item.id !== product.id) });
        } else {
          set({ items: [...currentItems, product] });
        }
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
      getWishlistCount: () => {
        return get().items.length;
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'house-of-saanvi-wishlist',
    }
  )
);
