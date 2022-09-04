import React, { useState } from "react"

export default function Login() {
  const [ user, setUser ] = useState({ email: '', password: '' })

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
  }
  return (
    <form className='login' onSubmit={handleSubmit}>
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

      <button>Login</button>
    </form>
  )
}
