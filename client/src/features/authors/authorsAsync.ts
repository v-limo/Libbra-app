import axios from 'axios'

import { createAsyncThunk } from '@reduxjs/toolkit'

import { authorType, postAuthor } from '../../types/bookTypes'

const AUTHOR_URL = '/authors'

export const fetchAuthors = createAsyncThunk(
  'books/getAllAuthors',
  async () => {
    const response = await axios.get(AUTHOR_URL)
    const result: authorType[] = await response.data

    return result
  }
)

export const addAuthor = createAsyncThunk(
  'author/create_author',
  async (author: postAuthor) => {
    const response = await axios.post(AUTHOR_URL, author)
    const result: authorType = response.data
    return result
  }
)

export const getAuthorId = createAsyncThunk(
  'author/findId',
  async (author: postAuthor) => {
    const response = await axios.get(`${AUTHOR_URL}/mail/${author.email}`)
    const id: string = response.data._d
    return id
  }
)
