import axios, { AxiosResponse } from 'axios'

const baseUrl: string = '/api/todo'

export const getTodos = async (token: string): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios({
      method: 'get',
      url: baseUrl + '/todos',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return todos
  } catch (error: any) {
    throw new Error(error)
  }
}

export const addTodo = async (
  formData: ITodo,
  token: string
): Promise<AxiosResponse<ApiDataType>> => {
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
          Authorization: `Bearer ${token}`
        }
      }
    )
    return saveTodo
  } catch (error: any) {
    throw new Error(error)
  }
}

export const updateTodo = async (
  todo: ITodo,
  token: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoUpdate: Pick<ITodo, 'status'> = {
      status: true,
    }
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-todo/${todo._id}`,
      todoUpdate,
        {
          headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return updatedTodo
  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteTodo = async (
  _id: string,
  token: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-todo/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return deletedTodo
  } catch (error: any) {
    throw new Error(error)
  }
}