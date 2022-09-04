import React, { useState } from "react"
import { useSignup } from "../hooks/useSignup";

export default function Signup() {
  const [ user, setUser ] = useState({ email: '', password: '' })
  const { signup, error, isLoading }: any = useSignup()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value)
    setUser(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(user)
    await signup(user.email, user.password)
  }
  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

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

      <button disabled={isLoading}>Signup</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
