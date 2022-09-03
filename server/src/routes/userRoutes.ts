import { Router } from "express"
import { signup, login, getUsers, deleteAll } from "../controllers/userController"

const userRoutes: Router = Router()

userRoutes.get('/deleteall', deleteAll);

userRoutes.get('/allusers', getUsers);

userRoutes.post('/signup', signup) 

userRoutes.post('/login', login)


export default userRoutes