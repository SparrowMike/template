import React from 'react'
import { render } from "react-dom";
import './styles/css/style.css'
import App from './App';
import { AuthContextProvider } from './context/AuthContext'

render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
