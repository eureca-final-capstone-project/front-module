import { createBrowserRouter } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import LoginPage from '../pages/LoginPage'
import AuthLayout from '../layout/AuthLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
])
