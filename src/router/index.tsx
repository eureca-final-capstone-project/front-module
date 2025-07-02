import { createBrowserRouter } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import LoginPage from '../pages/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])
