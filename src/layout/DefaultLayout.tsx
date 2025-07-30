import { Outlet, useLocation } from 'react-router-dom'
import Container from '../components/Container/Container'
import Header from '../components/Header/Header'

const DefaultLayout = () => {
  const location = useLocation()
  const isMypage = location.pathname.startsWith('/mypage')

  return (
    <div
      className={`${isMypage ? 'h-screen overflow-hidden' : ''} bg-background flex min-h-screen flex-col items-center`}
    >
      <Header />
      <div
        className={`mt-16 w-full flex-1 pt-6 sm:mt-21.5 sm:px-4 sm:pt-10 ${isMypage ? 'scrollbar-hide h-[calc(100vh)] overflow-auto' : ''} `}
      >
        <Container className="max-w-[1280px]">
          <Outlet />
        </Container>
      </div>
    </div>
  )
}

export default DefaultLayout
