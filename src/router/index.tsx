import { createBrowserRouter } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import LoginPage from '../pages/LoginPage'
import AuthLayout from '../layout/AuthLayout'
import DefaultLayout from '../layout/DefaultLayout'
import MyPage from '../pages/MyPage'
import PayChargeResultPage from '../pages/PayChargeResultPage'
import WebMobileLayout from '../layout/WebMobileLayout'
import WritePage from '../pages/WritePage'
import SignUpPage from '../pages/SignUpPage'
import OAuthCallbackPage from '../pages/LoginPage/OAuthCallbackPage'

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
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
      {
        path: '/oauth/callback',
        element: <OAuthCallbackPage />,
      },
    ],
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/mypage/:tabId',
        element: <MyPage />,
      },
      {
        path: '/charge-result',
        element: <PayChargeResultPage />,
      },
    ],
  },
  {
    element: <WebMobileLayout />,
    children: [
      {
        path: '/write',
        element: <WritePage />,
        handle: { title: '내 데이터 판매' },
      },
    ],
  },
])
