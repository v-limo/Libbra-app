import './App.css'

import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { ThemeProvider } from '@emotion/react'
import { Paper } from '@mui/material'

import { selectDarkMode } from './features/darkMode/darkModeSlice'
import AddAuthorC from './pages/AddAuthorC'
import AddBookPage from './pages/AddBookPage'
import Authors from './pages/Authors'
import BookDetails from './pages/BookDetails'
import Cart from './pages/Cart'
import { Home } from './pages/Home'
import Layout from './pages/Layout'
import NoMatch from './pages/NoMatch'
import Profile from './pages/Profile'
import UpdateBook from './pages/UpdateBook'
import { darkTheme, lightTheme } from './theme'

// import { theme } from './theme'

const App = () => {
  let { darkMode: mode } = useSelector(selectDarkMode)
  const theme = mode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ minHeight: '100vh' }}>
        <Router>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='book/:id' element={<BookDetails />} />
              <Route path='book/edit/:id' element={<UpdateBook />} />
              <Route path='book/add' element={<AddBookPage />} />
              <Route path='book/cart' element={<Cart />} />
              <Route path='authors' element={<Authors />} />
              <Route path='authors/add' element={<AddAuthorC />} />
              <Route path='profile' element={<Profile />} />
              <Route path='*' element={<NoMatch />} />
            </Route>
          </Routes>
        </Router>
      </Paper>
    </ThemeProvider>
  )
}

export default App
