import React from 'react'
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  return (
    <nav className='navigation'>
      <Link to="/">Home</Link>
      <Link to="doers">Doers</Link>
    </nav>
  )
}
