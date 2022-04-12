import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DeleteIcon from '@mui/icons-material/Delete'
import { Button, CardContent, CardMedia, Divider, Skeleton, Typography } from '@mui/material'
import { Box } from '@mui/system'

import { selectBooks } from '../features/books/booksSlice'
import { removeFromCart } from '../features/cart/cartSlice'
import { cartBook } from '../types/cartTypes'

type cartProps = {
  cart: cartBook
}

function CartItem({ cart }: cartProps) {
  const dispatch = useDispatch()
  const { books } = useSelector(selectBooks)

  let book = books.find((book) => book._id === cart.book)

  if (!book) {
    return <Skeleton variant='rectangular' width={210} height={118} />
  }

  const handleRemove = () => {
    dispatch(removeFromCart(cart))
  }

  const { title, subtitle, description, thumbnail } = book

  return (
    <Box
      sx={{
        m: '10px',
        height: '160px',
        borderRadius: '5px',
        flexGrow: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&:hover': { boxShadow: 1 },
      }}
    >
      {/* top */}
      <Box
        sx={{
          height: '50%',
          display: 'flex',
          mb: '30px',
        }}
      >
        <CardMedia
          component='img'
          sx={{
            objectFit: 'contain',
            height: '100%',
            width: 'auto',
            m: 2,
            borderRadius: '1px',
          }}
          src={thumbnail}
          alt='book photo'
        />
        <CardContent>
          <Typography variant='h6' color='primary'>
            {title}
          </Typography>
          <Typography variant='body1' color='secondary'>
            {subtitle}
          </Typography>
          <Typography variant='body2'>
            {description.substring(0, 80)} ...
          </Typography>
        </CardContent>
      </Box>

      {/* //down */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={handleRemove}
          variant='contained'
          color='error'
          size='small'
          startIcon={<DeleteIcon />}
        >
          Remove
        </Button>
        <Divider />
      </Box>
    </Box>
  )
}

export default CartItem
