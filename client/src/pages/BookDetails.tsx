import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import {
    Box, Button, Card, CardContent, CardMedia, Divider, IconButton, Skeleton, Typography
} from '@mui/material'
import Container from '@mui/material/Container'

import { selectIsAdmin } from '../features/auth/authSlice'
import { selectAuthors } from '../features/authors/authorsSlice'
import { deleteBook } from '../features/books/booksAsync'
import { selectBooks } from '../features/books/booksSlice'
import { addToCart, selectCart } from '../features/cart/cartSlice'

export default function BooksDetails() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  const { books } = useSelector(selectBooks)
  const { authors: writters } = useSelector(selectAuthors)
  const isAdmin = useSelector(selectIsAdmin)
  const { cart } = useSelector(selectCart)
  const inCart = cart.some((item) => item.book === id)
  const book = books.find((book) => book._id === id)
  if (!book)
    return (
      <Container maxWidth='lg' sx={{ minHeight: '100vh', mt: '68px' }}>
        <Skeleton variant='rectangular' width={210} height={118} />
      </Container>
    )

  const author = writters.find((author) => author._id === book?.authors)
  const { title, subtitle, description, pageCount, thumbnail } = book

  const borrowed = book?.user

  const addCartHandler = () => {
    let payload = { book: id, qty: 1 }
    dispatch(addToCart(payload))
  }

  const deleteBookHandler = () => {
    id && dispatch(deleteBook(id))
    navigate('/')
  }

  return (
    <Container maxWidth='lg' sx={{ minHeight: '100vh', mt: '68px' }}>
      <Card
        sx={{
          position: 'relative',
          p: 2,
          height: '450px',
          display: 'flex',
          '&:hover': { boxShadow: 2 },
        }}
      >
        <CardMedia
          component='img'
          sx={{
            flex: 1,
            objectFit: 'contain',
            height: '100%',
            width: 'auto',
            borderRadius: '10px',
          }}
          src={thumbnail}
          alt='book photo'
        />
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <Typography variant='h5' color='primary'>
            {title}
          </Typography>
          <Typography variant='h6'> -{subtitle}</Typography>
          <Typography variant='subtitle1'> By {author?.name}</Typography>
          <Typography variant='body2'>{pageCount} pages</Typography>
          {borrowed && (
            <Typography
              sx={{
                width: 'fit-content',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                p: 1,
                borderRadius: '10px',
              }}
            >
              in used
            </Typography>
          )}
          {!inCart && !borrowed && (
            <IconButton
              onClick={() => addCartHandler()}
              sx={{
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                top: '40%',
                right: 0,
                p: 2,
                '&:hover': { boxShadow: 10, color: 'secondary.main' },
              }}
            >
              <AddShoppingCartIcon />
            </IconButton>
          )}
          <IconButton
            onClick={() => navigate(`/`)}
            sx={{
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              top: '0',
              left: 0,
              p: 2,
              '&:hover': { boxShadow: 10, color: 'secondary.main' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          {isAdmin && (
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button
                onClick={deleteBookHandler}
                startIcon={<DeleteIcon />}
                color='error'
                variant='contained'
              >
                Delete
              </Button>

              <Button
                onClick={() => navigate(`/book/edit/${id}`)}
                startIcon={<ModeEditIcon />}
                color='primary'
                variant='contained'
              >
                Edit
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {description && (
        <Card sx={{ p: 4 }}>
          <Typography variant='h5' gutterBottom color='primary'>
            Book details
          </Typography>
          <Divider />
          <Typography sx={{ fontSize: '17px' }} variant='subtitle1'>
            {description}
          </Typography>
        </Card>
      )}
    </Container>
  )
}
