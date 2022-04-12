import express from 'express'
import passport from 'passport'

import {
  deleteAuthor,
  getAllAuthors,
  getAuthor,
  getAuthorByEmail,
  setAuthor,
  updateAuthor,
} from '../controllers/authorsController'
import isAdmin from '../middlewares/isAdmin'

const router = express.Router()

router
  .get('/', getAllAuthors)
  .post(
    '/',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    setAuthor
  )

router
  .get('/:authorId', getAuthor)
  .put(
    '/:authorId',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    updateAuthor
  )
  .delete(
    '/:authorId',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    deleteAuthor
  )
  .get('/mail/:email', getAuthorByEmail)

export default router
