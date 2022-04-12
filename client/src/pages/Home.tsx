import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Paper, Typography } from '@mui/material'

import { Books } from '../components/Books'
import { Loading } from '../components/Loading'
import Search from '../components/Search'
import { selectBooks } from '../features/books/booksSlice'
import { Book } from '../types/bookTypes'

export const Home = () => {
  const { books, isLoading } = useSelector(selectBooks)

  const [results, setResults] = useState<Book[]>([])

  if (isLoading) {
    return <Loading />
  }
  return (
    <Paper
      sx={{
        minHeight: '100vh',
        mt: '70px',
      }}
    >
      {books.length === 0 && (
        <Typography variant='body1'>
          No books found, Relaod or login and add Books
        </Typography>
      )}
      {books.length > 0 && <Search setResults={setResults} />}
      {results && results.length > 0 ? (
        <Box>
          <Typography
            variant='h6'
            color='primary'
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            {results.length} Book(s) found
          </Typography>
          <Books books={results} />
        </Box>
      ) : (
        books &&
        books.length > 0 && (
          <Box>
            <Typography
              variant='h6'
              color='primary'
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              {`${books.filter((book) => !book.user).length} / 
                 ${books.length}
                Book${books.length > 1 && 's'} available`}
            </Typography>
            <Books books={books} />
          </Box>
        )
      )}
    </Paper>
  )
}
