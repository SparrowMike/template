import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import NavigationBar from './layouts/NavigationBar'
import DoIt from './TODO/DoApp'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <NavigationBar /> 
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/doers" element={ user ? <DoIt /> : <Navigate to="/login" />} />
        <Route path="/login" element={ !user ? <Login /> : <Navigate to="/" /> } />
        <Route path="/signup" element={ !user ? <Signup /> : <Navigate to="/" /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
