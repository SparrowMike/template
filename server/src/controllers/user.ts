import { Response, Request, NextFunction } from 'express'
import { UserType } from '../types/user'
import User from '../models/user'

//! redirect instead of send

const secret =  (req: Request, res: Response): void => {
  res.send('Yayayayayaya')
}

const register = async (req: Request, res: Response): Promise<void> => {
  const { email, username, password } = req.body;
  const user = new User({ email, username, password })
  await user.save();
  res.send('/secret');
}

const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, username, password } = req.body
  try {
    const user: any = await User.signup(email, username, password)
    res.status(200).json({ username, user })
  } catch(error: unknown) { //? or any to remove if / else 
    if (error instanceof Error) {
      res.status(400).json({ error: error.message  })
    } else {
      console.log('Unknown Failure', error)
    }
  }
}

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, username, password } = req.body; 
  const foundUser = await User.findAndValidate(email, username, password);
  if (foundUser) {
    req.session!.user_id = foundUser._id
    res.send('/secret'); 
  } else {
    res.send('/login');
  }
}

const logout = (req: Request, res: Response): void => {
  req!.session!.user_id = null
  res.send('/login')
}

export { secret, register, signup, login, logout }