import axios from 'axios'

import { createAsyncThunk } from '@reduxjs/toolkit'

import { responseType } from '../../types/userTypes'

export const googleLoginn = createAsyncThunk(
  'auth/google-login',
  async (tokenId: string) => {
    const response = await axios.post('/users/google-login', {
      id_token: tokenId,
    })
    const result: responseType = response.data
    return result
  }
)

export const borrowBooks = createAsyncThunk(
  'auth/borrow',
  async (books: string[]) => {
    const response = await axios.post(`/users/borrow`, { books })
    const result: string[] = response.data
    return result
  }
)

export const returnBooks = createAsyncThunk(
  'auth/return',
  async (books: string[]) => {
    const response = await axios.post(`/users/return`, { books })
    const result: string[] = response.data
    return result
  }
)

//toggleAdmin
export const toggleAdmin = createAsyncThunk(
  'auth/toggle-admin',
  async (admin: boolean) => {
    const response = await axios.post(`/users/toggle-admin`, { admin })
    const result: boolean = response.data
    return result
  }
)

// delete account
export const deleteAccount = createAsyncThunk(
  'auth/delete-account',
  async () => {
    const response = await axios.delete(`/users/delete-account`)
    const result: string = response.data
    return result
  }
)

// return Book
export const returnBook = createAsyncThunk(
  'auth/return-book',
  async (id: string) => {
    const response = await axios.post(`/users/return-book`, { bookId: id })
    const result: string[] = response.data
    return result
  }
)

// return all books
export const returnAllBooks = createAsyncThunk(
  'auth/return-all-books',
  async () => {
    const response = await axios.get(`/users/return-all-books`)
    const result: string[] = response.data
    return result
  }
)
