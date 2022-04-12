import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { Card, CardActions, CardContent, Container, Divider, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import CartItem from '../components/CartItem'
import { borrowBooks } from '../features/auth/authAsync'
import { selectAuth } from '../features/auth/authSlice'
import { fetchBooks } from '../features/books/booksAsync'
import { selectBooks } from '../features/books/booksSlice'
import { clearCart, selectCart } from '../features/cart/cartSlice'

function Cart() {
  const { books, isLoading } = useSelector(selectBooks)
  const { cart } = useSelector(selectCart)
  const { user } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const borrow = () => {
    let boooksToborrow = books
      .filter((book) => cart.find((item) => item.book === book._id))
      ?.map((book) => book._id)
    dispatch(borrowBooks(boooksToborrow))
    dispatch(clearCart())
    setTimeout(() => {
      dispatch(fetchBooks())
      navigate('/')
    }, 2000)
  }

  let cost = 0

  return (
    <Container maxWidth='lg' sx={{ minHeight: '100vh', mt: '68px' }}>
      {cart.length === 0 ? (
        <Typography variant='body1'> No books in cart </Typography>
      ) : (
        <Box>
          <Typography variant='h5'> Order Books ({cart.length})</Typography>
          <Box sx={{ display: 'flex' }}>
            <Card
              sx={{
                mx: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {cart &&
                cart.map((cart) => (
                  <Box key={cart.book}>
                    <CartItem key={cart.book} cart={cart} />
                    <Divider sx={{ width: '80%', my: 4, mx: 'auto' }} />
                  </Box>
                ))}
              <Button
                sx={{
                  my: '16px',
                  mx: 'auto',
                  width: '50%',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'secondary',
                  },
                }}
                variant='contained'
                color='error'
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </Button>
            </Card>
            <Card
              sx={{
                p: '10px',
                width: '280px',
                height: 'fit-content',
              }}
            >
              <CardContent>
                <Typography variant='h6' color='primary'>
                  Cart Summary ({cart.length})
                </Typography>

                <Divider />
                <Box
                  component='span'
                  sx={{
                    fontSize: 16,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant='body1' color='secondary'>
                    Subtotal
                  </Typography>

                  <Typography variant='body1' color='secondary'>
                    {cost} €
                  </Typography>
                </Box>
                <Divider />
                <Box
                  component='span'
                  sx={{
                    fontSize: 16,
                    padding: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant='body1' color='secondary'>
                    Return Date
                  </Typography>
                  <Typography variant='body1' color='secondary'>
                    {new Date(+new Date() + 12096e5).toLocaleDateString()}
                  </Typography>
                </Box>

                <Divider />
              </CardContent>
              <CardActions>
                <Button
                  disabled={cart.length === 0 || isLoading || !user}
                  variant='contained'
                  color='primary'
                  fullWidth
                  onClick={borrow}
                >
                  {user ? 'borrow' : 'login to borrow'}
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Box>
      )}
    </Container>
  )
}

export default Cart
