export interface Book {
  _id: string
  title: string
  subtitle?: string
  authors: string
  publishedDate: string
  description: string
  pageCount: number
  thumbnail: string
  createdAt: string
  updatedAt: string
  user?: string
}

export interface postBook {
  title: string
  subtitle?: string
  authors: string
  publishedDate: string
  description: string
  pageCount: number
  thumbnail: string
}

// *********************************

export interface postAuthor {
  email: string
  name: string
}

export interface authorType {
  email: string
  name: string
  _id: string
  createdAt: string
  updatedAt: string
}
