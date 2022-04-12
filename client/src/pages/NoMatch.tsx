import React from 'react'
import { Link } from 'react-router-dom'

import { Box, Button, Container, Typography } from '@mui/material'

import img from '../img/img_not_found.jpg'

const NoMatch = () => (
  <>
    <Box>
      <title>404 | Todo App</title>
    </Box>
    <Box
      component='main'
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%',
      }}
    >
      <Container maxWidth='md'>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography align='center' color='textPrimary' variant='body1'>
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align='center' color='textPrimary' variant='subtitle2'>
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt='Under development'
              src={img}
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560,
              }}
            />
          </Box>
          <Link to='/'>
            <Button
              component='a'
              sx={{
                mt: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              variant='contained'
            >
              Go back to Homepage
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  </>
)

export default NoMatch
