import { NextFunction, Request, Response } from 'express'

import { BadRequestError } from '../helpers/apiError'
import Author from '../models/authorsModel'
import authorService from '../services/authorService'

// POST /authors
export const setAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body
    const author = new Author({
      name,
      email,
    })
    await authorService.create(author)
    res.json(author)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /authors/:authorId
export const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const authorId = req.params.authorId
    const updatedAuthor = await authorService.update(authorId, update)
    res.json(updatedAuthor)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /authors/:authorId
export const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authorService.deleteAuthor(req.params.authorId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /authors/:authorId
export const getAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await authorService.findById(req.params.authorId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /authors
export const getAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await authorService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /authors/mail/:email
export const getAuthorByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await authorService.findByMail(req.params.email))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
