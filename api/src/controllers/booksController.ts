import { NextFunction, Request, Response } from 'express'

import { BadRequestError } from '../helpers/apiError'
import Book from '../models/booksModel'
import bookService from '../services/bookService'

// POST /books
export const setBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      subtitle,
      publishedDate,
      description,
      pageCount,
      thumbnail,
      authors,
    } = req.body

    const book = new Book({
      title,
      subtitle,
      publishedDate,
      description,
      pageCount,
      thumbnail,
      authors,
    })
    await bookService.create(book)
    res.json(book)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /books/:bookId
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    const updatedBook = await bookService.update(bookId, update)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /books/:bookId
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.bookId
    const deletedBook = await bookService.deleteBook(id)
    res.json(deletedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /Books/:bookId
export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findById(req.params.bookId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /books
export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
