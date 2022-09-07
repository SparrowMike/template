import { Request, Response, NextFunction } from 'express'
const jwt = require('jsonwebtoken');
import User from '../models/userModel'

export type EndPointResponse = Promise<Response>;

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {

  const { authorization } = req.headers
  
  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.checker( _id )

    next()

  } catch(error: any) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

export { requireAuth }