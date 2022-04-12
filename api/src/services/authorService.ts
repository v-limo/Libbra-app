import { NotFoundError } from '../helpers/apiError'
import Author, { authorDocument } from '../models/authorsModel'

const create = async (author: authorDocument): Promise<authorDocument> => {
  return author.save()
}

const findById = async (authorId: string): Promise<authorDocument> => {
  const foundAuthor = await Author.findById(authorId)
  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }
  return foundAuthor
}

const findAll = async (): Promise<authorDocument[]> => {
  return Author.find()
}

const update = async (
  authorId: string,
  update: Partial<authorDocument>
): Promise<authorDocument | null> => {
  const foundAuthor = await Author.findByIdAndUpdate(authorId, update, {
    new: true,
  })
  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const deleteAuthor = async (
  authorId: string
): Promise<authorDocument | null> => {
  const foundAuthor = Author.findByIdAndDelete(authorId)

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const findByMail = async (email: string): Promise<authorDocument> => {
  const foundAuthor = await Author.findOne({ email })
  if (!foundAuthor) {
    throw new NotFoundError(`Author ${email} not found`)
  }
  return foundAuthor
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteAuthor,
  findByMail,
}
