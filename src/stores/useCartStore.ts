import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductSize, ProductColor } from '@/types';

export interface CartItem {
  product: Product;
  size: ProductSize;
  color: ProductColor;
  quantity: number;
  cartItemId: string; // unique ID for product+size+color combo
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size: ProductSize, color: ProductColor, quantity?: number) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size, color, quantity = 1) => {
        const cartItemId = `${product.id}-${size}-${color}`;
        
        set((state) => {
          const existingItemIndex = state.items.findIndex(item => item.cartItemId === cartItemId);
          
          if (existingItemIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems };
          }
          
          return {
            items: [...state.items, { product, size, color, quantity, cartItemId }]
          };
        });
      },
      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId)
        }));
      },
      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) => 
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          )
        }));
      },
      clearCart: () => set({ items: [] }),
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'house-of-saanvi-cart',
    }
  )
);
