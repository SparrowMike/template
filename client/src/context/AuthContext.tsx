import { createContext, useReducer } from 'react'

interface User {
  token: string, 
  user: { email: string, password: string }
}
interface IContextProps {
  user: User,
  state: any,
  dispatch: ({ type }: { 
    type: string, 
    payload?: User
    }) => void;
}

export const AuthContext = createContext({} as IContextProps);

export const authReducer = (state: any, action: { type: any, payload: any }) => {
  console.log(`authReducer ${state}, ${action}`)
  switch(action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default: 
      return state
  }
}

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  console.log(`AuthContext state ${JSON.stringify(state)}`)
  console.log(`AuthContext children ${JSON.stringify(children)}`)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}