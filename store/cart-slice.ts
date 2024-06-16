// import {create} from 'zustand'
// import {persist, createJSONStorage} from 'zustand/middleware'
// // import { Product } from '@prisma/client'

// import {toast} from 'react-hot-toast'
// import { Product } from '@prisma/client'

// const useCartStore = create((set) => {
//   cart: [],
//   addToCart: (product: Product) => set((state: []) => ({cart: [...state.cart, product]}))
// })

// type CartStore = {
//   items: Product[]
//   addItem: (data: Product, quantity: number) => void,
//   removeItem: (id: string) => void,
//   removeAll: () => void,
//   updateQuantity: (id: string, quantity: number) => void
// }

// const useCart = create(persist<CartStore>(
//   (set, get) => ({
//     items: [],
//     addItem: (data: Product, quantity: number) => {
//       const currentItems = get().items;
//       const existingItem = currentItems.find(item => item.id === data.id);

//       if (existingItem) {
//         existingItem.quantity += quantity;
//         set({...items, })
//       }

//       if (!existingItem) {
//         set({items: [...get().items, data]})
//       }
//       toast.success('item added to cart')
//     },
//     removeItem: (id: string) => {
//       set({items: [...get().items.filter(item => item.id !== id)]})
//       toast.success('item removed from cart')
//     },

//     removeAll: () => set({items: []}),
//     updateQuantity: (id: string, quantity: number) => {
//       console.log(id, quantity)
//       const updatedItems = get().items.map((item) => item.id === id ? {...item, quantity}: item)
//       toast.success('item added cart')
//     }
    
//   }), {name: "cart-storage", storage: createJSONStorage(() => localStorage)}
//   )
// )

// export default useCart