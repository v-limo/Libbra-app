import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'
import { cartBook } from '../../types/cartTypes'

export interface cartState {
  cart: cartBook[]
}

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart') as string) || [],
} as cartState

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addToCart: (state, { payload }) => {
      localStorage.removeItem('cart')
      let includes = state.cart.findIndex((b) => b.book === payload.book) !== -1
      if (!includes) {
        state.cart.push(payload)
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    removeFromCart: (state, { payload }) => {
      localStorage.removeItem('cart')
      state.cart = state.cart.filter(({ book }) => book !== payload.book)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    clearCart: (state) => {
      state.cart = []
      localStorage.removeItem('cart')
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export const selectCart = (state: RootState) => state.cart
export default cartSlice.reducer
