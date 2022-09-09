import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import { getTodos, addTodo, updateTodo, deleteTodo } from './API'
import { useAuthContext } from '../hooks/useAuthContext'

const App: React.FC = () => {
  const { user } = useAuthContext()

  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    if (!user) {
      console.log('You must be logged in')
      return
    } 

    getTodos(user)
      .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
      .catch((err: Error) => console.log(err))
  }

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault()

    if (!user) {
      console.log('You must be logged in')
      return
    } 

    addTodo(formData, user)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Error! Todo not saved')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateTodo = (todo: ITodo): void => {
    if (!user) {
      console.log('You must be logged in')
      return
    } 
    
    updateTodo(todo, user)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not updated')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
  }

  const handleDeleteTodo = (_id: string): void => {
    if (!user) {
      console.log('You must be logged in')
      return
    } 
    
    deleteTodo(_id, user)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not deleted')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
  }

  return (
    <main className='doers'>
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  )
}

export default App