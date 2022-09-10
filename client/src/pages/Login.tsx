import React, { useState } from "react"
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [ user, setUser ] = useState({ email: '', password: '' })
  const { login, error, isLoading } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(user.email, user.password)
    console.log(user)
  }
  return (
    <form className='login' onSubmit={handleSubmit}>
      <h3>Login</h3>

      <label>Email:</label>
      <input 
        type='email'
        onChange={handleChange}
        value={user.email}
        name='email'
      />

      <label>Password:</label>
      <input 
        type='password'
        onChange={handleChange}
        value={user.password}
        name='password'
      />

      <button disabled={isLoading}>Login</button>
      {error && <div className='error'></div>}
    </form>
  )
}
