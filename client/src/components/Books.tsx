import React from 'react'

import { Box, Grid } from '@mui/material'

import { Book as BookType } from '../types/bookTypes'
import Book from './Book'

type booksProps = {
  books: BookType[]
}

export const Books = ({ books }: booksProps) => {
  return (
    <Box
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 1223,
        flexGrow: 1,
      }}
    >
      <Grid
        container
        justifyContent='space-evenly'
        alignItems='stretch'
        spacing={3.5}
      >
        {books &&
          books.map((book) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={book._id + Math.random()}
            >
              <Book book={book} />
            </Grid>
          ))}
      </Grid>
    </Box>
  )
}
