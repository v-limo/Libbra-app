import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { BadRequestError } from '../helpers/apiError'
import User, { userDocument } from '../models/userModel'
import userService from '../services/userService'
import { JWT_SECRET } from '../util/secrets'

// PUT /users/borrow
export const borrowBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = req.body
    const user = req.user as any
    const userId = user?._id
    const updatedUser = await userService.updateBorrow(userId, books)
    res.json(updatedUser?.books)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /users/return-all-books
export const returnAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as any
    const userId = user?._id
    const updatedUser = await userService.returnAll(userId)
    res.json(updatedUser?.books)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /users/return-book
export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as any
    const userId = user?._id
    const bookId = req.body.bookId
    const updatedUser = await userService.returnBookS(userId, bookId)
    res.json(updatedUser?.books)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /users/toggle-admin
export const toogleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = req.body
    const user = req.user as any
    const userId = user?._id
    const updatedUser = await userService.updateAdmin(userId, admin)
    res.json(updatedUser?.admin)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// POST /users
export const setUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, userName } = req.body

    const user = new User({
      email,
      userName,
    })
    await userService.create(user)
    res.json(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /users/:userId
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const user = req.user as any
    const userId = user?._id
    const updatedUser = await userService.update(userId, update)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /users/:userId
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as any
    const userId = user?._id
    await userService.deleteUser(userId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /users/:userId
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await userService.findById(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await userService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as any
    const token = jwt.sign({ email: user?.email, id: user?._id }, JWT_SECRET)
    res.json({ user, token })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
export const facebookLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const user = req.user as any
    // const token = jwt.sign({ email: user?.email, id: user?._id }, JWT_SECRET)
    // res.json({ user, token })
    res.json({ message: 'facebook login' })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
