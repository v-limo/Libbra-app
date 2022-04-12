import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { Container, Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Author from '../components/Author'
import { selectIsAdmin } from '../features/auth/authSlice'
import { selectAuthors } from '../features/authors/authorsSlice'

export const img =
  'https://sbooks.net/wp-content/uploads/2021/10/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg'

function Cart() {
  const { authors } = useSelector(selectAuthors)
  const navigate = useNavigate()
  const isAdmin = useSelector(selectIsAdmin)
  return (
    <Container
      maxWidth='lg'
      sx={{
        minHeight: '100vh',
        mt: '68px',
        position: 'relative',
      }}
    >
      {authors.length === 0 ? (
        <Typography variant='body1'> No Authors </Typography>
      ) : (
        <Box>
          <Typography
            variant='h6'
            color='primary'
            sx={{ display: 'flex', m: 2, justifyContent: 'center' }}
          >
            {`${authors.length} Authors`}
          </Typography>
          <Box
            component='img'
            sx={{
              objectFit: 'contain',
              height: '450px',
              width: '100%',
              borderRadius: '5px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            src={img}
            alt='image'
          />
          <Box sx={{ display: 'flex' }}>
            <Grid container spacing={3}>
              {authors.map((author) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={author._id}>
                  <Author key={author._id} author={author} />
                </Grid>
              ))}
            </Grid>

            {isAdmin && (
              <Button
                variant='contained'
                color='secondary'
                sx={{
                  position: 'absolute',
                  top: '20px',
                  right: '0',
                }}
                onClick={() => navigate('/authors/add')}
              >
                Add New author
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Container>
  )
}

export default Cart
