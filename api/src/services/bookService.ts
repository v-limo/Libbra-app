import { NotFoundError } from '../helpers/apiError'
import Author, { authorDocument } from '../models/authorsModel'
import Book, { bookDocument } from '../models/booksModel'

const create = async (book: bookDocument): Promise<bookDocument> => {
  return book.save()
}

const findById = async (bookId: string): Promise<bookDocument> => {
  const foundBook = await Book.findById(bookId)
  if (!foundBook) {
    throw new NotFoundError(`book ${bookId} not found`)
  }
  return foundBook
}

const findAll = async (): Promise<bookDocument[]> => {
  return Book.find()
}

const update = async (
  bookId: string,
  update: Partial<bookDocument>
): Promise<bookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
  })
  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }
  return foundBook
}

const deleteBook = async (bookId: string): Promise<bookDocument | null> => {
  const foundBook = Book.findByIdAndDelete(bookId)
  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }
  return foundBook
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteBook,
}
