import { Product } from "@prisma/client";
import { create } from "zustand";
import {persist, createJSONStorage} from 'zustand/middleware'

export interface CartState {
  cart: Array<Product & {quantity: number}>
  addItem: (product: Product) => void
  removeItem: (product: Product) => void
  clearCart: () => void
  items: number,
}

const useCartStore = create(persist<CartState>((set, get) => ({
  cart: [],
  items: 0,
  addItem: (product: Product) => set((state) => {
    state.items++
    const itemExists = state.cart.find(item => item.id === product.id)

    if (itemExists) {
      return {
        cart: state.cart.map(item => {
          if (item.id === product.id) {
            return {...item, quantity: item.quantity + 1}
          }          
          return item
        })
      }
    } else {
      return {
        cart: [...state.cart, {...product, quantity: 1}]
      }
    }
  }),
  removeItem: (product: Product) => set((state) => {
    return {
      cart: state.cart.map(item => {
        if (item.id === product.id) {
          state.items--
          return { ...item, quantity: item.quantity - 1}
        }
        return item
      }).filter(item => item.quantity > 0)
    }
  }),
  clearCart: () => set((state) => {
    return {
      items: 0,
      cart: []
    }
  }),
}), {name: "cart-storage", storage: createJSONStorage(() => localStorage)}))

export default useCartStore