import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import passport from 'passport'

import {
  facebookStrategy,
  googleTokenStrategy,
  jwtStrategy,
} from './config/passport'
import apiContentType from './middlewares/apiContentType'
import apiErrorHandler from './middlewares/apiErrorHandler'
import authorRouter from './routers/authorsRoutes'
import bookRouter from './routers/booksRoutes'
import userRouter from './routers/userRoutes'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 5000)

// Global middleware
app.use(cors())
app.use(apiContentType)
app.use(express.json())

// passport strategies
app.use(passport.initialize())
passport.use(googleTokenStrategy)
passport.use(facebookStrategy)
passport.use(jwtStrategy)

// Set up routers
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/authors', authorRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
