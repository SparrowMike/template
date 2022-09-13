import { Response, Request } from 'express'
import { ITodo } from '../types/todoTypes'
import Todo from '../models/todoModel'
import { catchAsync } from '../middleware/catchAsync';
import ExpressError from '../utils/ExpressError';

const getTodos = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const user_id = req.user!._id
    console.log(user_id)
    const todos: ITodo[] = await Todo.find({ user_id })
    res.status(200).json({ todos })
});

const addTodo = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const user_id = req.user!._id

    const body = req.body as Pick<ITodo, 'name' | 'description' | 'status'>

    const todo: ITodo = new Todo({
        name: body.name,
        description: body.description,
        status: body.status,
        user_id: user_id
    }) 

    const newTodo: ITodo = await todo.save()
    const allTodos: ITodo[] = await Todo.find()

    res.status(201).json({ message: 'Todo added', todo: newTodo, todos: allTodos })
});

const updateTodo = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const {
        params: { id },
        body,
    } = req
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
        { _id: id },
        body
    )
    const allTodos: ITodo[] = await Todo.find()
    res.status(200).json({
        message: 'Todo updated',
        todo: updateTodo,
        todos: allTodos,
    })
});

const deleteTodo = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
        req.params.id
    )
    const allTodos: ITodo[] = await Todo.find()
    res.status(200).json({
        message: 'Todo deleted',
        todo: deletedTodo,
        todos:allTodos,
    })
});

export { getTodos, addTodo, updateTodo, deleteTodo }