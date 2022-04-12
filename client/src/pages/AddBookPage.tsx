import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { Container, Divider, MenuItem, Select, TextareaAutosize, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'

import { selectAuthors } from '../features/authors/authorsSlice'
import { addBook } from '../features/books/booksAsync'
import { postBook } from '../types/bookTypes'

function AddBookPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { authors: writters } = useSelector(selectAuthors)

  const options = writters.map((author) => ({
    label: author.name,
    value: author._id,
  }))

  // author
  const [author, setAuthor] = useState(options[0]?.value || '')

  // book
  const [title, setTitle] = useState('')
  const [subtitle, setSubTitle] = useState('')
  const [publishedDate, setpublishedDate] = useState('')
  const [description, setdescription] = useState('')
  const [pageCount, setpageCount] = useState<number>(0)
  const [thumbnail, setthumbnail] = useState('')
  let book2post: postBook = {
    title,
    subtitle,
    authors: author,
    publishedDate,
    description,
    pageCount,
    thumbnail,
  }
  const Add = () => {
    if (
      title.length > 0 &&
      publishedDate.length > 4 &&
      description.length > 0 &&
      author.length > 0
    ) {
      dispatch(addBook(book2post))
      navigate('/')
    } else alert('Please fill all the fields')
  }

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setAuthor(e.target.value)
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
      <FormControl
        sx={{
          width: '60%',
          mx: 'auto',
        }}
      >
        <Divider sx={{ width: '100%', my: 4 }}>Author</Divider>
        <FormLabel> Select Author</FormLabel>
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

        <Typography variant='body2' color='initial'>
          Author not in the list? <Link to='/authors/add'>add new author</Link>
        </Typography>
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

          <FormLabel>Book subtitle </FormLabel>
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

          <FormLabel>Book publishedDate *</FormLabel>
          <TextField
            fullWidth
            id='text'
            type='date'
            value={publishedDate}
            onChange={(e: {
              target: { value: React.SetStateAction<string> }
            }) => {
              setpublishedDate(e.target.value)
            }}
          />

          <FormLabel>Book description *</FormLabel>

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
            disabled={!publishedDate || !description || !author || !title}
          >
            Add Book
          </Button>
        </>
      </FormControl>
    </Container>
  )
}

export default AddBookPage
