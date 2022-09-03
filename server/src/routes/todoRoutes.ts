import { Router } from "express"
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todoController"

const toDoRoutes: Router = Router()

toDoRoutes.get("/todos", getTodos)

toDoRoutes.post("/add-todo", addTodo)

toDoRoutes.put("/edit-todo/:id", updateTodo)

toDoRoutes.delete("/delete-todo/:id", deleteTodo)

export default toDoRoutes