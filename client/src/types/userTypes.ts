export interface USerType {
  [x: string]: any
  admin: boolean
  books: string[]
  email: string
  userName: string
  _id: string
  createdAt: string
  updatedAt: string
}


export type registerProps = {
  userName: string
  email: string
  password: string
}

export type loginProps = {
  email: string
  password: string
}

export type responseType = {
  user: USerType
  token: string
}
