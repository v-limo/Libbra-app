import express from 'express'
import passport from 'passport'

import {
  deleteBook,
  getAllBooks,
  getBook,
  setBook,
  updateBook,
} from '../controllers/booksController'
import isAdmin from '../middlewares/isAdmin'

const router = express.Router()

router.get('/', getAllBooks)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  setBook
)

router
  .get('/:bookId', getBook)
  .put(
    '/:bookId',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    updateBook
  )
  .delete(
    '/:bookId',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    deleteBook
  )

export default router
