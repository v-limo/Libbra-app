import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router'

import { Box } from '@mui/material'

import { Footer } from '../components/Footer'
import Header from '../components/Header'
import { fetchAuthors } from '../features/authors/authorsAsync'
import { selectAuthors, sortAuthors } from '../features/authors/authorsSlice'
import { fetchBooks } from '../features/books/booksAsync'

function Layout() {
  const dispatch = useDispatch()
  const { authors } = useSelector(selectAuthors)
  useEffect(() => {
    dispatch(fetchBooks())
    dispatch(fetchAuthors())
  }, [dispatch])

  useEffect(() => {
    if (authors.length > 0) {
      dispatch(sortAuthors())
    }
  }, [authors.length, dispatch])

  return (
    <Box>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  )
}
export default Layout
