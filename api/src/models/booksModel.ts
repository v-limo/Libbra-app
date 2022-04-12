import { Document, model, Schema } from 'mongoose'

export type bookDocument = Document & {
  title: string
  subtitle?: string
  publishedDate: string
  description: string
  pageCount: number
  thumbnail: string
  authors: string
  user?: string
}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    publishedDate: { type: String, minlength: 4 },
    description: { type: String, required: true },
    pageCount: { type: Number, default: 0 },
    thumbnail: {
      type: String,
      default:
        'http://smartmobilestudio.com/wp-content/uploads/2012/06/leather-book-preview.png',
    },
    authors: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

export default model<bookDocument>('Book', BookSchema)
