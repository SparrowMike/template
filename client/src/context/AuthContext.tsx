import { createContext, useReducer, useEffect } from 'react'
import { useJwt } from "react-jwt";

interface User {
  token: string, 
  user: { email: string | null, password: string }
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
  // console.log(`authReducer ${JSON.stringify(state)}, ${JSON.stringify(action)}`)
  console.log(state, action)
  switch(action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      console.log('tit')
      return { user: null }
    default: 
      return state
  }
}

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  // @ts-ignore
  let user: User = JSON.parse(localStorage.getItem('user'));
  const { decodedToken, isExpired } = useJwt(user?.token);

  if (isExpired) {
    localStorage.removeItem('user');
  }

  console.log(`AuthContext children ${JSON.stringify(children)}`)

  useEffect(() => {
    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }
  }, [])
  

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}