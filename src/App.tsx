import './App.css'
import Home from './pages/home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import ProtectedRoute from './pages/protected-route/ProtectedRoute'
import RegisterUser from './pages/register-user/RegisterUser'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProtectedRoute> <Home/> </ProtectedRoute>} />
        <Route path='login' element={<Login/>} />
        <Route path='register-user' element={<RegisterUser/>} />
      </Routes>
    </Router>
  )
}

export default App
