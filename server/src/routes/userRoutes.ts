import { Router } from "express"
import { signup, login, getUsers, deleteAll } from "../controllers/userController"

import { requireAuth } from "../middleware/requireAuth";

const userRoutes: Router = Router()
// userRoutes.use(requireAuth)

userRoutes.get('/deleteall', deleteAll);

userRoutes.get('/allusers',requireAuth, getUsers);

userRoutes.post('/signup', signup) 

userRoutes.post('/login', login)


export default userRoutes