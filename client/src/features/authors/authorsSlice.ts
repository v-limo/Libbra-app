import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'
import { authorType } from '../../types/bookTypes'
import { addAuthor, fetchAuthors } from './authorsAsync'

type AuthorsState = {
  authors: authorType[]
  isLoading: boolean
  error: boolean
}

const initialState = {
  authors: [],
  isLoading: false,
  error: false,
} as AuthorsState

export const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    sortAuthors(state) {
      // sort authors by name
      state.authors.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
    },
  },

  extraReducers: (builder) => {
    //fetchauthors
    builder.addCase(fetchAuthors.pending, (state) => {
      state.isLoading = true
      state.error = false
    })

    builder.addCase(fetchAuthors.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      state.authors = payload
    })

    builder.addCase(fetchAuthors.rejected, (state) => {
      state.isLoading = false
      state.error = true
      state.authors = []
    })

    // Add authors
    builder.addCase(addAuthor.pending, (state) => {
      state.isLoading = true
      state.error = false
    })

    builder.addCase(addAuthor.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      state.authors.push(payload)
    })

    builder.addCase(addAuthor.rejected, (state) => {
      state.isLoading = false
      state.error = true
    })
  },
})

export const { sortAuthors } = authorsSlice.actions
export const selectAuthors = (state: RootState) => state.authors
export default authorsSlice.reducer
