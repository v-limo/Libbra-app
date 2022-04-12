import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import authorsReducer from '../features/authors/authorsSlice'
import booksReducer from '../features/books/booksSlice'
import cartReducer from '../features/cart/cartSlice'
import darkModeReducer from '../features/darkMode/darkModeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authors: authorsReducer,
    books: booksReducer,
    darkMode: darkModeReducer,
    cart: cartReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export type RootState = ReturnType<typeof store.getState>
