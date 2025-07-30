import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import LoginPage from '../pages/LoginPage'
import AuthLayout from '../layout/AuthLayout'
import DefaultLayout from '../layout/DefaultLayout'
import MyPage from '../pages/MyPage'
import PayChargeResultPage from '../pages/PayChargeResultPage'
import WebMobileLayout from '../layout/WebMobileLayout'
import PostWritePage from '../pages/PostWritePage'
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
import BidDetailPage from '../pages/DetailPage/BidDetailPage'
import NotFoundPage from '../pages/NotFoundPage'
import PasswordResetPage from '../pages/PasswordResetPage'
import CompletePage from '../pages/CompletePage'
import MyPostPage from '../pages/MyPostPage'
import AdminLoginPage from '../pages/AdminPage/AdminLoginPage'
import RefundPage from '../pages/RefundPage'
import ReportHistory from '../pages/AdminPage/ReportHistory'
import RestrictionHistory from '../pages/AdminPage/RestrictionHistory'
import ReportDetailPage from '../pages/AdminPage/ReportDetailPage'

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
      { path: '/reset-password', element: <PasswordResetPage /> },
      {
        path: '/admin/login',
        element: <AdminLoginPage />,
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
        path: '/posts/normal/:transactionFeedId',
        element: <NormalDetailPage />,
      },
      {
        path: '/posts/bid/:transactionFeedId',
        element: <BidDetailPage />,
      },
      {
        path: '/mypage/:tabId',
        element: <MyPage />,
      },
      {
        path: '/charge-result',
        element: <PayChargeResultPage />,
      },
      {
        path: '/my-posts',
        element: <MyPostPage />,
      },
    ],
  },
  {
    element: <WebMobileLayout />,
    children: [
      {
        path: '/post-write',
        element: <PostWritePage />,
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
        path: '/refund',
        element: <RefundPage />,
        handle: { title: '페이 환전하기' },
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
      {
        path: '/admin/reports',
        element: <ReportHistory />,
      },
      {
        path: '/admin/restrictions',
        element: <RestrictionHistory />,
      },
      {
        path: '/admin/reports/:reportId',
        element: <ReportDetailPage />,
      },
    ],
  },

  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    path: '/verify-email-complete',
    element: <CompletePage />,
    handle: { text: '회원가입이 완료되었습니다.' },
  },
  {
    path: '/reset-password-complete',
    element: <CompletePage />,
    handle: { text: '비밀번호가 성공적으로 변경되었습니다.' },
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
])
