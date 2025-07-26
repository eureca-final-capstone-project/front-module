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
import AdditionalInfoPage from '../pages/SignUpPage/AdditionalInfoPage'
import ChangeDataPage from '../pages/ChangeDataPage'
import AdminLayout from '../layout/AdminLayout'
import Dashboard from '../pages/AdminPage/Dashboard'
import PostPage from '../pages/PostPage'
import PaymentPage from '../pages/PaymentPage'
import PaymentSuccessPage from '../pages/PaymentSuccessPage'
import PaymentFailPage from '../pages/PaymentFailPage'
import UserHistory from '../pages/AdminPage/UserHistory'
import NormalDetailPage from '../pages/DetailPage/NormalDetailPage'
import DataPurchasePage from '../pages/DataPurchasePage'

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
        path: '/additional-info',
        element: <AdditionalInfoPage />,
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
        path: '/posts',
        element: <PostPage />,
      },
      {
        path: '/posts/normal/:postId',
        element: <NormalDetailPage />,
      },
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
      {
        path: '/change-data',
        element: <ChangeDataPage />,
        handle: { title: '데이터 전환하기' },
      },
      {
        path: '/payment',
        element: <PaymentPage />,
        handle: { title: '페이 충전하기' },
      },
      {
        path: '/payment-success',
        element: <PaymentSuccessPage />,
        handle: { title: '결제 완료' },
      },
      {
        path: '/payment-fail',
        element: <PaymentFailPage />,
        handle: { title: '결제 실패' },
      },
      {
        path: '/data-purchase/:transactionFeedId',
        element: <DataPurchasePage />,
        handle: { title: '데이터 구매' },
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: '/admin/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/admin/users',
        element: <UserHistory />,
      },
    ],
  },
])
