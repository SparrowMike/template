import axios, { AxiosResponse } from 'axios'

const baseUrl: string = '/api/todo'

export const getTodos = async (user: { user: {}, token: string}): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios({
      method: 'get',
      url: baseUrl + '/todos',
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })

    return todos
  } catch (error: any) {
    throw new Error(error)
  }
}

export const addTodo = async (formData: ITodo, user: { user: {}, token: string}): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo: Omit<ITodo, '_id'> = {
      name: formData.name,
      description: formData.description,
      status: false,
    }
    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + '/add-todo',
      todo,
        {
          headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    )
    return saveTodo
  } catch (error: any) {
    throw new Error(error)
  }
}

export const updateTodo = async (todo: ITodo, user: { user: {}, token: string} ): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoUpdate: Pick<ITodo, 'status'> = {
      status: true,
    }
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-todo/${todo._id}`,
      todoUpdate,
        {
          headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    )
    return updatedTodo
  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteTodo = async (_id: string, user: { user: {}, token: string}): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-todo/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    )
    return deletedTodo
  } catch (error: any) {
    throw new Error(error)
  }
}