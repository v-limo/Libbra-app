import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Card, CardContent, CardMedia, Container, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'

import { deleteAccount, returnAllBooks, returnBook } from '../features/auth/authAsync'
import { logout, selectAuth } from '../features/auth/authSlice'
import { fetchBooks } from '../features/books/booksAsync'
import { selectBooks } from '../features/books/booksSlice'

function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { books } = useSelector(selectBooks)
  const { user } = useSelector(selectAuth)

  const userBooks = user?.books || []

  if (!user) {
    navigate('/')
    return <></>
  }

  const borrowBooks = books?.filter((book) =>
    userBooks.find((userBook) => userBook === book._id)
  )

  return (
    <Container
      maxWidth='lg'
      sx={{
        minHeight: '100vh',
        mt: '68px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* Books */}
      {borrowBooks.length > 0 && (
        <Card
          sx={{
            flexGrow: 1,
            mr: '24px',
            p: '24px',
          }}
        >
          <Typography variant='h6' color='primary'>
            Borrowed Books
          </Typography>

          {borrowBooks?.map(
            ({ _id, title, subtitle, description, thumbnail }) => (
              <Box
                key={_id}
                sx={{
                  height: '200px',
                  display: 'flex',
                  mb: '30px',
                }}
              >
                <CardMedia
                  component='img'
                  sx={{
                    objectFit: 'contain',
                    height: '100%',
                    width: '30%',
                    m: 2,
                    borderRadius: '1px',
                  }}
                  src={thumbnail}
                  alt='book photo'
                />
                <CardContent
                  sx={{
                    m: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                  }}
                >
                  <Typography variant='h6' color='primary'>
                    {title}
                  </Typography>
                  <Typography variant='body1' color='secondary'>
                    {subtitle}
                  </Typography>

                  <Button
                    variant='contained'
                    color='primary'
                    sx={{
                      alignSelf: 'flex-start',
                      m: 2,
                    }}
                    onClick={() => {
                      dispatch(returnBook(_id))
                      setTimeout(() => {
                        dispatch(fetchBooks())
                      }, 1000)
                    }}
                  >
                    Return Book
                  </Button>
                  <Divider sx={{ width: '100%', my: 4 }} />
                </CardContent>
              </Box>
            )
          )}

          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              dispatch(returnAllBooks())
              setTimeout(() => {
                dispatch(fetchBooks())
              }, 1000)
            }}
          >
            Return All books
          </Button>
        </Card>
      )}

      {/* profile */}
      <Card
        sx={{
          position: 'relative',
          cursor: 'pointer',
          spacing: '24px',

          p: 2,
          width: 'fit-content',
          height: '500px',
          display: 'flex',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
          '&:hover': { boxShadow: 1 },
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant='outlined'
            color='error'
            onClick={() => {
              dispatch(logout())
            }}
          >
            Logout
          </Button>

          <Typography variant='h5' color='primary'>
            Profile Summary
          </Typography>
          <Divider />
          <Typography variant='h6' color='primary'>
            UserName : {user?.userName}
          </Typography>
          <Typography variant='body1' color='secondary'>
            Email : {user?.email}
          </Typography>
          <Typography variant='subtitle2'>
            Created At :{new Date().toLocaleDateString()}
          </Typography>
          <Typography variant='body2'>
            No. of books: {user?.books?.length}
          </Typography>
          <Typography variant='body2'>
            id: {user?._id?.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}
          </Typography>
          <Typography variant='body2'>
            Roles: {user?.admin ? 'Admin' : 'User'}
          </Typography>

          <Typography variant='h5' color='red'>
            Danger Zone
          </Typography>
          <Divider />

          <Button
            variant='contained'
            color='error'
            onClick={() => dispatch(deleteAccount())}
          >
            <DeleteIcon /> Delete Account
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Profile
