import './index.css'

import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { CssBaseline } from '@mui/material'

import App from './App'
import { store } from './app/store'
import reportWebVitals from './reportWebVitals'

//axios base URL configuration forproduction and development
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:5000/api/v1'

//axios request interceptors
axios.interceptors.request.use(
  (request) => {
    const token = store.getState().auth.tokens.accessToken as string | null

    if (token) {
      request.headers = { Authorization: `Bearer ${token}` }
    }
    return request
  },

  (error) => {
    return Promise.reject(error)
  }
)

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
