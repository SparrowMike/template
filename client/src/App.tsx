import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './layouts/NavigationBar'
import DoIt from './TODO/DoApp'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {

  return (
    <BrowserRouter>
      <NavigationBar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doers" element={<DoIt />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
