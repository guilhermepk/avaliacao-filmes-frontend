import './App.css'
import Home from './pages/home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import RegisterUser from './pages/register-user/RegisterUser'
import AddContentToList from './pages/add-content-to-list/AddContentToList'
import CreateList from './pages/create-list/CreateList'
import NotFound from './pages/not-found/NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='login' element={<Login/>} />
        <Route path='register-user' element={<RegisterUser/>} />
        <Route path='*' element={<NotFound/>}/>

        <Route path='/' element={<ProtectedRoute children={<Home/>}/>} />
        <Route path='add-content-to-list' element={<ProtectedRoute children={<AddContentToList/>}/>} />
        <Route path='create-list' element={<ProtectedRoute children={<CreateList/>}/>} />
      </Routes>
    </Router>
  )
}

export default App
