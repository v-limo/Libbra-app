import { Document, model, Schema } from 'mongoose'

export type userDocument = Document & {
  email: string
  userName: string
  books?: string[]
  admin?: boolean
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, minlength: 3 },
    admin: { type: Boolean, default: false },
    books: [{ type: Schema.Types.ObjectId, ref: 'Books' }],
  },
  { timestamps: true }
)

export default model<userDocument>('User', UserSchema)
