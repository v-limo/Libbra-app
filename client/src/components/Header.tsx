import React, { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import PeopleIcon from '@mui/icons-material/People'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppBar, Avatar, Badge, Box, Button, Switch, Toolbar, Typography } from '@mui/material'

import { googleLoginn, toggleAdmin } from '../features/auth/authAsync'
import { selectAuth, selectIsAdmin } from '../features/auth/authSlice'
import { selectCart } from '../features/cart/cartSlice'
import { selectDarkMode, toggleDarkMode } from '../features/darkMode/darkModeSlice'

export default function Bar() {
  const dispatch = useDispatch()
  const { darkMode } = useSelector(selectDarkMode)
  const navigate = useNavigate()
  const { user } = useSelector(selectAuth)
  const isAdmin = useSelector(selectIsAdmin)
  const { cart } = useSelector(selectCart)

  const [checked, setChecked] = useState(isAdmin || false)

  const google_Login = (response: any) => {
    const { tokenId } = response
    dispatch(googleLoginn(tokenId))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
    dispatch(toggleAdmin(e.target.checked))
  }
  
  useEffect(() => {
    setChecked(isAdmin || false)
  }, [isAdmin])

  return (
    <AppBar elevation={0} sx={{ backgroundColor: 'background.default' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Hurricane',
            fontSize: 38,
            fontWeight: 700,
            flex: 2,
            cursor: 'pointer',

            '&:hover': {
              color: 'primary',
            },
          }}
          variant='h4'
          color='primary'
          onClick={() => navigate('/')}
        >
          Libbra
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flex: 1,
          }}
        >
          <Button
            variant='text'
            color='primary'
            onClick={() => {
              navigate('/authors')
            }}
          >
            <PeopleIcon /> Authors
          </Button>

          {user ? (
            <>
              <Typography
                variant='body1'
                sx={{ display: 'flex', alignItems: 'center' }}
                color='primary'
              >
                admin: <Switch checked={checked} onChange={handleChange} />
              </Typography>
              <Avatar
                onClick={() => navigate('/profile')}
                sx={{ bgcolor: 'secondary', cursor: 'pointer' }}
              >
                {user?.userName?.charAt(0)?.toUpperCase()}
              </Avatar>
            </>
          ) : (
            <>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
                buttonText='Login'
                onSuccess={google_Login}
                onFailure={google_Login}
                cookiePolicy={'single_host_origin'}
              />
            </>
          )}

          <Button onClick={() => dispatch(toggleDarkMode())}>
            {!darkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </Button>

          <Button onClick={() => navigate(`/book/cart`)}>
            <Badge badgeContent={cart.length} color='success'>
              <ShoppingCartIcon /> Cart
            </Badge>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
