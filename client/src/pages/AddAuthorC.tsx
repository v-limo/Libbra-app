import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Container, Divider, IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'

import { addAuthor } from '../features/authors/authorsAsync'
import { postAuthor } from '../types/bookTypes'

function AddAuthorC() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  let author2post: postAuthor = {
    name,
    email,
  }

  const isEmail = (email: string) => {
    // check if email is valid and return true or false
    email = email.trim()
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  }

  const handleMailChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setEmail(e.target.value)
  }

  const handleNameChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setName(e.target.value)
  }

  const Add = () => {
    dispatch(addAuthor(author2post))
    navigate('/')
  }

  return (
    <Container
      maxWidth='lg'
      sx={{
        minHeight: '100vh',
        mt: '68px',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FormControl sx={{ width: '50%', mx: 'auto', postion: 'relative' }}>
        <Divider sx={{ width: '100%', my: 4 }}>Author</Divider>
        <FormLabel>Author's Name *</FormLabel>
        <TextField
          fullWidth
          id='text'
          type='text'
          value={name}
          onChange={handleNameChange}
        />
        <FormLabel>Author's email* </FormLabel>
        <TextField
          fullWidth
          id='email'
          type='email'
          value={email}
          onChange={handleMailChange}
        />

        <Button
          sx={{ mt: 2 }}
          variant='contained'
          color='primary'
          size='large'
          disabled={email.length === 0 || name.length === 0 || !isEmail(email)}
          onClick={Add}
        >
          Add Author
        </Button>
        <Divider sx={{ width: '100%', my: 4 }}></Divider>
      </FormControl>
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          top: '50px',
          left: 'auto',
          p: 2,
          '&:hover': { boxShadow: 10, color: 'secondary.main' },
        }}
      >
        <ArrowBackIcon />
      </IconButton>
    </Container>
  )
}

export default AddAuthorC
