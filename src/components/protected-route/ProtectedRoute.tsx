import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps){
  const userToken = localStorage.getItem('userToken');
  return userToken ? children : <Navigate to='/login'/>
}

export default ProtectedRoute;