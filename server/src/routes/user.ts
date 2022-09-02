import { Router, Response, Request, NextFunction } from "express"
import { secret, register, login, logout } from "../controllers/user"

const userRoutes: Router = Router()


const requireLogin = (req: Request, res: Response, next: NextFunction): void=> {
  if (!req!.session!.user_id) {
    res.redirect('something went wrong')
  } else {
    res.redirect('/secret');
  }
  next()
}

userRoutes.get("/secret", requireLogin, secret)

// userRoutes.get("/register", register)

userRoutes.post("/register", register)

// userRoutes.get("/login", login)

userRoutes.post("/login", login)

userRoutes.post("/logout", logout)

export default userRoutes