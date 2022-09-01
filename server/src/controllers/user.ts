import { Response, Request } from 'express'
import { UserType } from './../types/user'
import User from './../models/user'
const bcrypt = require('bcrypt')

const secret = (req: Request, res: Response): void => {
  if (!req!.session!.user_id) {
    res.redirect('/login');
  }
}

const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12)
  const user = new User({
    username,
    password: hash
  })
  await user.save();
  res.redirect('/secret');
}

const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body; 
  const user =  await User.findOne({ username })
  console.log(user)
  const validPassword = await bcrypt.compare(password, user!.password) //! will come back to you !
  if (validPassword) {                                                 //! will come back to you !
    console.log(req!.session!.user_id)
    req!.session!.user_id = user!._id
    res.redirect('/secret');
  } else {
    res.redirect('/login');
  }
}

const logout = (req: Request, res: Response): void => {
  req!.session!.user_id = null
  res.redirect('/login')
}
export { secret, register, login, logout }