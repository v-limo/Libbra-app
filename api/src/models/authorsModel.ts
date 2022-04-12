import { Document, model, Schema } from 'mongoose'

export type authorDocument = Document & {
  name: string
  email: string
}

const authorSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
)

export default model<authorDocument>('Author', authorSchema)
