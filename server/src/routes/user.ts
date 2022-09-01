import { Router } from "express"
import { secret, register, login, logout } from "../controllers/user"

const userRoutes: Router = Router()

userRoutes.get("/secret", secret)

// userRoutes.get("/register", register)

userRoutes.post("/register", register)

// userRoutes.get("/login", login)

userRoutes.post("/login", login)

userRoutes.post("/logout", logout)

export default userRoutes