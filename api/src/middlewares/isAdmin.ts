import { NextFunction, Request, Response } from 'express'

import { ForbiddenError } from '../helpers/apiError'
import { userDocument } from '../models/userModel'

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any

  if (user?.admin) {
    next()
  } else {
    throw new ForbiddenError()
  }
}

export default isAdmin
