import { Response, Request, NextFunction } from 'express'
import { UserType } from '../types/user'
import User from '../models/user'

//! redirect instead of send

const secret =  (req: Request, res: Response): void => {
  res.send('Yayayayayaya')
}

const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const user = new User({ username, password })
  await user.save();
  res.redirect('/secret');
}

const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body; 
  const foundUser = await User.findAndValidate(username, password);
  if (foundUser) {
    req!.session!.user_id = foundUser._id
    res.redirect('/secret'); 
  } else {
    res.send('/login');
  }
}

const logout = (req: Request, res: Response): void => {
  req!.session!.user_id = null
  res.send('/login')
}
export { secret, register, login, logout }