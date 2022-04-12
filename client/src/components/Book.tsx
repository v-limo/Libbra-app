import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import {
    Box, Button, Card, CardActions, CardContent, CardMedia, Divider, IconButton, Typography
} from '@mui/material'

import { selectIsAdmin } from '../features/auth/authSlice'
import { selectAuthors } from '../features/authors/authorsSlice'
import { deleteBook } from '../features/books/booksAsync'
import { addToCart, selectCart } from '../features/cart/cartSlice'
import { Book as BookType } from '../types/bookTypes'

type bookProps = {
  book: BookType
}

function Book({ book }: bookProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { authors: writters } = useSelector(selectAuthors)
  let bookAuthor = writters.find((author) => author._id === book.authors)
  let author = bookAuthor ? bookAuthor.name : 'Author not found'
  const isAdmin = useSelector(selectIsAdmin)
  const { _id: id, title, subtitle, pageCount, thumbnail, user } = book
  const { cart } = useSelector(selectCart)
  const inCart = cart.some((item) => item.book === id)

  const borrowed = user

  const addCartHandler = () => {
    let payload = { book: id, qty: 1 }
    dispatch(addToCart(payload))
  }

  const deleteBookHandler = () => {
    dispatch(deleteBook(id))
  }

  return (
    <Card
      sx={{
        position: 'relative',
        cursor: 'pointer',
        p: 2,
        height: '418px',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        '&:hover': { boxShadow: 4 },
      }}
    >
      <CardMedia
        component='img'
        sx={{
          objectFit: 'contain',
          height: '40%',
          width: 'auto',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        src={thumbnail}
        alt='book photo'
      />
      <CardContent>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h6'>{title}</Typography>
          <Divider />
          <Typography variant='body1'>
            {subtitle?.substring(0, 20).concat('...')}
          </Typography>
          <Typography variant='caption'>{`${pageCount} pages`}</Typography>
          <Typography variant='body2'>{` By ${author} `}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        {!inCart && !borrowed && (
          <IconButton
            onClick={() => addCartHandler()}
            size='small'
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

        {isAdmin && (
          <Box
            sx={{
              position: 'absolute',
              width: 'fit-content',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              top: 0,
              right: 0,
            }}
          >
            <IconButton
              color='warning'
              onClick={deleteBookHandler}
              size='small'
            >
              <DeleteIcon />
            </IconButton>

            <IconButton
              onClick={() => navigate(`/book/edit/${id}`)}
              size='small'
            >
              <ModeEditIcon />
            </IconButton>
          </Box>
        )}
        {borrowed && (
          <Typography
            sx={{
              position: 'absolute',
              width: 'fit-content',
              borderRadius: '10px',
              display: 'flex',
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              top: 0,
              left: 0,
            }}
          >
            in used
          </Typography>
        )}
        <Button
          onClick={() => navigate(`/book/${id}`)}
          variant='contained'
          color='primary'
          fullWidth
        >
          View
        </Button>
      </CardActions>
    </Card>
  )
}

export default Book
