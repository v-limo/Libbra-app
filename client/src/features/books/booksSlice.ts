import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'
import { Book } from '../../types/bookTypes'
import { addBook, deleteBook, fetchBooks, updateBook } from './booksAsync'

type BooksState = {
  books: Book[]
  isLoading: boolean
  error: boolean
}

const initialState = {
  books: [],
  isLoading: false,
  error: false,
} as BooksState

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    doNothing(state, action) {},
  },

  extraReducers: (builder) => {
    //fetchBooks
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoading = true
      state.error = false
    })

    builder.addCase(fetchBooks.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      state.books = payload
    })

    builder.addCase(fetchBooks.rejected, (state) => {
      state.isLoading = false
      state.error = true
      state.books = []
    })

    // Addbook
    builder.addCase(addBook.pending, (state) => {
      state.isLoading = true
      state.error = false
    })

    builder.addCase(addBook.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      state.books.push(payload)
    })

    builder.addCase(addBook.rejected, (state) => {
      state.isLoading = false
      state.error = true
    })

    // deleteBook
    builder.addCase(deleteBook.pending, (state) => {
      state.isLoading = true
      state.error = false
    })

    builder.addCase(deleteBook.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      state.books = state.books.filter((b) => b._id !== payload._id)
    })

    builder.addCase(deleteBook.rejected, (state) => {
      state.isLoading = false
      state.error = true
    })

    // updateBook
    builder.addCase(updateBook.pending, (state) => {
      state.isLoading = true
      state.error = false
    })

    builder.addCase(updateBook.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      const index = state.books.findIndex((b) => b._id === payload._id)
      state.books[index] = payload
    })
  },
})

export const { doNothing } = booksSlice.actions
export const selectBooks = (state: RootState) => state.books
export default booksSlice.reducer
