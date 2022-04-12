import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { Card, CardContent, CardMedia, Divider, Skeleton, Typography } from '@mui/material'
import { Box } from '@mui/system'

import { selectBooks } from '../features/books/booksSlice'
import { img } from '../pages/Authors'
import { authorType } from '../types/bookTypes'

type authorProps = {
  author: authorType
}

function Author({ author }: authorProps) {
  const { books } = useSelector(selectBooks)
  const navigate = useNavigate()
  let AuthorsBooks = books.filter((book) => book.authors === author._id)
  if (!author) {
    return <Skeleton variant='rectangular' width={210} height={118} />
  }

  return (
    <Card
      sx={{
        m: 2,
        position: 'relative',
        cursor: 'pointer',
        minHeight: '250px',
        height: '418px',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        borderRadius: '10px',
        width: '100%',
        alignItems: 'center',
        '&:hover': { boxShadow: 3 },
      }}
    >
      <CardMedia
        component='img'
        sx={{
          objectFit: 'contain',
          height: '20%',
          width: 'auto',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        alt='image'
        src={
          AuthorsBooks[Math.floor(Math.random() * AuthorsBooks.length)]
            ?.thumbnail || img
        }
      />

      <CardContent sx={{ flexGrow: 1, overFlowY: 'scroll' }}>
        <Typography variant='h6' color='primary'>
          {author.name}
        </Typography>
        <Typography variant='caption' color='primary'>
          {author.email}
        </Typography>
        <Typography variant='body1' color='primary'>
          {AuthorsBooks.length} book(s)
        </Typography>
        <Divider />
        {AuthorsBooks.map((book, i) => (
          <Box
            key={book._id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Typography
              variant='body1'
              onClick={() => navigate('/book/' + book._id)}
              color='secondary'
            >
              {`${i + 1}. ${book.title}`}
            </Typography>
            <Box
              component='img'
              sx={{
                position: 'absolute',
                right: '0',
                top: '0',
                height: '40px',
                width: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
              src={book.thumbnail || img}
              alt='image'
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  )
}

export default Author
