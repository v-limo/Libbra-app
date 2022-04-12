import express from 'express'
import passport from 'passport'

import {
  borrowBooks,
  deleteUser,
  facebookLogin,
  getAllUsers,
  getUser,
  googleLogin,
  returnAllBooks,
  returnBook,
  setUser,
  toogleAdmin,
  updateUser,
} from '../controllers/usersController'

const router = express.Router()

// CRUD
router.get('/all', getAllUsers)
router.post('/', setUser)

// router.get('/:userId', passport.authenticate('jwt', { session: false }), getUser)
router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  updateUser
)

router.delete(
  '/delete-account',
  passport.authenticate('jwt', { session: false }),
  deleteUser
)

router.post(
  '/google-login',
  passport.authenticate('google-id-token', { session: false }),
  googleLogin
)

router.get(
  '/facebook-login',

  passport.authenticate('facebook', { session: false }),
  facebookLogin
)

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect('/')
  }
)

router.post(
  '/borrow',
  passport.authenticate('jwt', { session: false }),
  borrowBooks
)

router.post(
  '/toggle-admin',
  passport.authenticate('jwt', { session: false }),
  toogleAdmin
)

router.get(
  '/return-all-books',
  passport.authenticate('jwt', { session: false }),
  returnAllBooks
)

router.post(
  '/return-book',
  passport.authenticate('jwt', { session: false }),
  returnBook
)

export default router
