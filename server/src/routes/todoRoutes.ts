import { Router } from "express"
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todoController"
import { requireAuth } from "../middleware/requireAuth"

const toDoRoutes: Router = Router()

toDoRoutes.use(requireAuth)

toDoRoutes.get("/todos", getTodos)

toDoRoutes.post("/add-todo", addTodo)

toDoRoutes.put("/edit-todo/:id", updateTodo)

toDoRoutes.delete("/delete-todo/:id", deleteTodo)

export default toDoRoutes