import _ from 'lodash'

import { NotFoundError } from '../helpers/apiError'
import User, { userDocument } from '../models/userModel'
import Book, { bookDocument } from '../models/booksModel'

// returnAll
const returnAll = async (UserId: string): Promise<userDocument | null> => {
  //Remove user from booksModel > to booksService later
  const books = await Book.find({ user: UserId })
  books.map(async (book) => {
    const foundBook = await Book.findByIdAndUpdate(
      { _id: book._id },
      { user: undefined },
      { new: true }
    )
    if (!foundBook) {
      throw new NotFoundError(`Book ${book} not found`)
    }
  })
  // *********

  const foundUser = await User.findByIdAndUpdate(
    UserId,
    { books: [] },
    {
      new: true,
    }
  )
  if (!foundUser) {
    throw new NotFoundError(`User ${UserId} not found`)
  }
  return foundUser
}

// returnBookS
const returnBookS = async (
  UserId: string,
  bookId: string
): Promise<userDocument | null> => {
  const user = await User.findById(UserId).select('books')

  if (!user) {
    throw new NotFoundError(`User ${UserId} not found`)
  }
  // *********
  //Remove user from booksModel > to booksService later
  const foundBook = await Book.findByIdAndUpdate(
    { _id: bookId },
    { user: undefined },
    { new: true }
  )
  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }
  // *********

  const userbooks = user.books
  const updatedBooks = userbooks
    ?.map((book) => book.toString())
    ?.filter((book) => book !== bookId.toString())

  const foundUser = await User.findByIdAndUpdate(
    UserId,
    { books: updatedBooks },
    { new: true }
  )
  if (!foundUser) {
    throw new NotFoundError(`User ${UserId} not found`)
  }
  return foundUser
}

// Borrow
const updateBorrow = async (
  UserId: string,
  books: Partial<userDocument>
): Promise<userDocument | null> => {
  const user = await User.findById(UserId).select('books')

  if (!user) {
    throw new NotFoundError(`User ${UserId} not found`)
  }

  const reqbooks = books.books as string[]
  const userbooks = user?.books?.map((book) => book.toString()) as string[]

  const updatedBooks = _.uniq([...userbooks, ...reqbooks])

  // *********
  // add user to booksModel
  updatedBooks?.map(async (book) => {
    const foundBook = await Book.findByIdAndUpdate(
      { _id: book },
      { user: UserId },
      { new: true }
    )
    if (!foundBook) {
      throw new NotFoundError(`Book ${book} not found`)
    }
  })
  // *********

  const foundUser = await User.findByIdAndUpdate(
    UserId,
    { books: updatedBooks },
    {
      new: true,
    }
  )
  if (!foundUser) {
    throw new NotFoundError(`User ${UserId} not found`)
  }
  return foundUser
}

// Update admin status
const updateAdmin = async (
  UserId: string,
  admin: Partial<userDocument>
): Promise<userDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(UserId, admin, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${UserId} not found`)
  }
  return foundUser
}

// *****************************************************************************

const create = async (user: userDocument): Promise<userDocument> => {
  return user.save()
}

const findById = async (UserId: string): Promise<userDocument> => {
  const foundUser = await User.findById(UserId)

  if (!foundUser) {
    throw new NotFoundError(`User ${UserId} not found`)
  }

  return foundUser
}

const findAll = async (): Promise<userDocument[]> => {
  return User.find()
}

const update = async (
  UserId: string,
  update: Partial<userDocument>
): Promise<userDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(UserId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${UserId} not found`)
  }
  return foundUser
}

const deleteUser = async (UserId: string): Promise<userDocument | null> => {
  const foundUser = User.findByIdAndDelete(UserId)

  if (!foundUser) {
    throw new NotFoundError(`User ${UserId} not found`)
  }

  return foundUser
}

export default {
  create,
  findById,
  findAll,
  update,
  returnAll,
  returnBookS,
  deleteUser,
  updateBorrow,
  updateAdmin,
}
