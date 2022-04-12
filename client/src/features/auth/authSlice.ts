import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'
import { USerType } from '../../types/userTypes'
import {
    borrowBooks, deleteAccount, googleLoginn, returnAllBooks, returnBook, toggleAdmin
} from './authAsync'

type tokensType = {
  accessToken: string | null
}

type authState = {
  user: USerType | null
  tokens: tokensType
  isLoading: boolean
  error: boolean
}

let accessToken = localStorage.getItem('access_token')
let Userlocal = localStorage.getItem('user')

const initialState = {
  user: Userlocal ? JSON.parse(Userlocal) : '',
  tokens: {
    accessToken: accessToken ? JSON.parse(accessToken) : '',
  },
  isLoading: false,
  error: false,
} as authState

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state: authState, action: PayloadAction) {
      state.isLoading = false
      state.error = false
      state.user = null
      state.tokens.accessToken = null
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
    },
  },
  extraReducers: (builder) => {
    // google login
    builder.addCase(googleLoginn.pending, (state) => {
      state.isLoading = true
      state.user = null
      state.tokens.accessToken = null
      state.error = false
    })

    builder.addCase(googleLoginn.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      state.user = payload.user
      state.tokens.accessToken = payload.token
      localStorage.setItem('user', JSON.stringify(payload.user))
      localStorage.setItem('access_token', JSON.stringify(payload.token))
    })

    builder.addCase(googleLoginn.rejected, (state) => {
      state.isLoading = false
      state.error = true
      state.user = null
      state.tokens.accessToken = null
      localStorage.setItem('access_token', '')
      localStorage.setItem('user', '')
    })

    // borrow books
    builder.addCase(borrowBooks.pending, (state) => {
      state.isLoading = true
      state.error = false
    })

    builder.addCase(borrowBooks.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      if (state.user) {
        state.user.books = payload
      }
      localStorage.setItem('user', JSON.stringify(state.user))
    })

    builder.addCase(borrowBooks.rejected, (state) => {
      state.isLoading = false
      state.error = true
    })

    // return all books
    builder.addCase(returnAllBooks.pending, (state) => {
      state.isLoading = true
      state.error = false
    })

    builder.addCase(returnAllBooks.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      if (state.user) {
        state.user.books = payload
      }
      localStorage.setItem('user', JSON.stringify(state.user))
    })

    builder.addCase(returnAllBooks.rejected, (state) => {
      state.isLoading = false
      state.error = true
    })

    // return book
    builder.addCase(returnBook.pending, (state) => {
      state.isLoading = true
      state.error = false
    })

    builder.addCase(returnBook.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      if (state.user) {
        state.user.books = payload
      }
      localStorage.setItem('user', JSON.stringify(state.user))
    })

    builder.addCase(returnBook.rejected, (state) => {
      state.isLoading = false
      state.error = true
    })

    //admin toggle
    builder.addCase(toggleAdmin.pending, (state) => {
      state.isLoading = true
      state.error = false
    })

    builder.addCase(toggleAdmin.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      state.user && (state.user.admin = payload)
      localStorage.setItem('user', JSON.stringify(state.user))
    })

    builder.addCase(toggleAdmin.rejected, (state) => {
      state.isLoading = false
      state.error = true
    })

    // delete account
    builder.addCase(deleteAccount.pending, (state) => {
      state.isLoading = true
      state.error = false
    })

    builder.addCase(deleteAccount.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      state.user = null
      state.tokens.accessToken = null
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
    })

    builder.addCase(deleteAccount.rejected, (state) => {
      state.isLoading = false
      state.error = true
    })
  },
})

export const { logout } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth
export const selectIsAdmin = (state: RootState) => state.auth.user?.admin
export default authSlice.reducer
