import axios from 'axios'

import { createAsyncThunk } from '@reduxjs/toolkit'

import { Book, postBook } from '../../types/bookTypes'

const BOOK_URL = '/books'

export const fetchBooks = createAsyncThunk('books/getbooks', async () => {
  const response = await axios.get(BOOK_URL)
  const result: Book[] = await response.data
  return result
})

export const addBook = createAsyncThunk(
  'books/addbook',
  async (book: postBook, thunkAPI) => {
    const response = await axios.post(BOOK_URL, book)
    const result: Book = response.data
    return result
  }
)

export const deleteBook = createAsyncThunk(
  'books/deletebook',
  async (id: string, thunkAPI) => {
    const response = await axios.delete(`${BOOK_URL}/${id}`)
    const result: Book = response.data
    return result
  }
)

export type updateProps = {
  id: string
  book: postBook
}
// update book
export const updateBook = createAsyncThunk(
  'books/updatebook',
  async (update: updateProps, thunkAPI) => {
    const { id, book } = update
    const response = await axios.put(`${BOOK_URL}/${id}`, book)
    const result: Book = response.data
    return result
  }
)
