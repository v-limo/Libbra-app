import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

import { Container, Divider, MenuItem, Select, TextareaAutosize, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'

import { selectAuthors } from '../features/authors/authorsSlice'
import { updateBook } from '../features/books/booksAsync'
import { selectBooks } from '../features/books/booksSlice'
import { postBook } from '../types/bookTypes'

function UpdateBook() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { authors: writters } = useSelector(selectAuthors)
  const { books, isLoading } = useSelector(selectBooks)

  const book = books.find((book) => book._id === id)
  const options = writters.map((author) => ({
    label: author.name,
    value: author._id,
  }))

  // author
  const index = options.findIndex((option) => option.value === book?.authors)

  // author
  const [author, setAuthor] = useState(options[index]?.value || '')

  // book
  const [title, setTitle] = useState('')
  const [subtitle, setSubTitle] = useState('')
  const [publishedDate, setpublishedDate] = useState('')
  const [description, setdescription] = useState('')
  const [pageCount, setpageCount] = useState<number>(0)
  const [thumbnail, setthumbnail] = useState('')

  useEffect(() => {
    if (book) {
      setTitle(book.title)
      setSubTitle(book?.subtitle || '')
      setpublishedDate(book.publishedDate)
      setdescription(book.description)
      setpageCount(book.pageCount)
      setthumbnail(book.thumbnail)
    }
  }, [book, index])

  if (!book) {
    return null
  }

  const Add = () => {
    if (title && subtitle && publishedDate && description && author && id) {
      let book2post: postBook = {
        title,
        subtitle,
        authors: author,
        publishedDate,
        description,
        pageCount,
        thumbnail,
      }
      const update = { book: book2post, id }
      dispatch(updateBook(update))
      navigate('/')
    } else alert('Please fill all the fields')
  }

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setAuthor(e.target.value)
  }

  if (isLoading) {
    return (
      <Container
        maxWidth='lg'
        sx={{ minHeight: '100vh', mt: '68px', mx: 'auto' }}
      >
        <Typography variant='h4'>Loading...</Typography>
      </Container>
    )
  }

  if (book === undefined) {
    return (
      <Container
        maxWidth='lg'
        sx={{ minHeight: '100vh', mt: '68px', mx: 'auto' }}
      >
        <Typography variant='h4'>Book not found</Typography>
      </Container>
    )
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
      <FormControl sx={{ width: '50%', m: 'auto' }}>
        <Divider sx={{ width: '100%', my: 4 }}>Author</Divider>

        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          placeholder='Select Author'
          value={author}
          onChange={handleChange}
          
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <>
          <Divider sx={{ width: '100%', my: 2 }}>Book</Divider>
          <TextField
            fullWidth
            id='text'
            type='text'
            value={title}
            onChange={(e: {
              target: { value: React.SetStateAction<string> }
            }) => {
              setTitle(e.target.value)
            }}
          />

          <FormLabel>Book subtitle *</FormLabel>
          <TextField
            fullWidth
            id='text'
            type='text'
            value={subtitle}
            onChange={(e: {
              target: { value: React.SetStateAction<string> }
            }) => {
              setSubTitle(e.target.value)
            }}
          />

          <FormLabel>Book publishedDate</FormLabel>
          <TextField
            fullWidth
            id='text'
            type='text'
            value={publishedDate}
            onChange={(e: {
              target: { value: React.SetStateAction<string> }
            }) => {
              setpublishedDate(e.target.value)
            }}
          />

          <FormLabel>Book description</FormLabel>
          <TextField
            fullWidth
            id='text'
            type='text'
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setdescription(e.target.value)
            }
          />
          <TextareaAutosize
            id='text'
            minRows={3}
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setdescription(e.target.value)
            }
            placeholder='Book description'
          />

          <FormLabel>Book pagecount (optional)</FormLabel>
          <TextField
            fullWidth
            id='text'
            type='number'
            value={pageCount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setpageCount(Number(e.target.value))
            }
          />

          <FormLabel>Book thumbnail (optional)</FormLabel>
          <TextField
            fullWidth
            id='text'
            type='text'
            value={thumbnail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setthumbnail(e.target.value)
            }
          />
          <Button
            sx={{ mt: 2 }}
            variant='contained'
            color='primary'
            size='large'
            onClick={Add}
            disabled={
              title === book.title &&
              subtitle === book.subtitle &&
              publishedDate === book.publishedDate &&
              description === book.description &&
              pageCount === book.pageCount &&
              thumbnail === book.thumbnail &&
              author === book.authors
            }
          >
            Update Book
          </Button>
        </>
      </FormControl>
    </Container>
  )
}

export default UpdateBook
