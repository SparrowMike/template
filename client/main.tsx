import React from 'react'
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/css/style.css'
import App from './App'
import NavigationBar from './layouts/NavigationBar'
import Doers from './components/Doers'

//? react router v6.3.0
//? https://reactrouter.com/en/v6.3.0/getting-started/overview
render(
  <React.StrictMode>
    <BrowserRouter>
      <NavigationBar /> 
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/doers" element={<Doers />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
