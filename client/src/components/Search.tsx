import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { Container } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { selectIsAdmin } from '../features/auth/authSlice'
import { selectBooks } from '../features/books/booksSlice'
import { Book } from '../types/bookTypes'

const notify = (info: string) =>
  toast(info, {
    position: 'bottom-left',
    duration: 3000,
  })

type searchProps = {
  setResults: React.Dispatch<React.SetStateAction<Book[]>>
}

function Search({ setResults }: searchProps) {
  const { books } = useSelector(selectBooks)

  const navigate = useNavigate()
  const isAdmin = useSelector(selectIsAdmin)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let timer1 = setTimeout(() => 1000)
    setResults([])
    if (query.length > 0) {
      const results = books.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          (book?.subtitle &&
            book?.subtitle.toLowerCase().includes(query.toLowerCase())) ||
          book?.description.toLowerCase().includes(query.toLowerCase())
      )
      if (results.length > 0) {
        setResults(results)
      } else {
        notify(`No books found for "${query}"`)
      }
    }
    return () => {
      clearTimeout(timer1)
    }
  }, [query, books, setResults])

  const SearchHandler = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setQuery((e.target.value as string).toLowerCase())
  }

  return (
    <Container
      maxWidth='lg'
      sx={{
        display: 'flex',
        pt: 2,
      }}
    >
      <TextField
        sx={{ flexGrow: '1', mx: '40px' }}
        id='search'
        label='Search books'
        variant='outlined'
        value={query}
        onChange={SearchHandler}
      />
      {isAdmin && (
        <Button
          variant='contained'
          size='small'
          color='primary'
          onClick={() => navigate('/book/add')}
        >
          Add Book
        </Button>
      )}
      <Toaster />
    </Container>
  )
}

export default Search
