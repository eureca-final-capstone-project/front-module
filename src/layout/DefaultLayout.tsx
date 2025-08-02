import { Outlet, useLocation } from 'react-router-dom'
import Container from '../components/Container/Container'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const DefaultLayout = () => {
  const location = useLocation()
  const isMypage = location.pathname.startsWith('/mypage')
  const isDetailPage =
    location.pathname.startsWith('/posts/bid') || location.pathname.startsWith('/posts/normal')

  return (
    <div className={`bg-background flex min-h-screen flex-col items-center`}>
      <Header />
      <div
        className={`mt-16 w-full flex-1 pt-6 sm:mt-21.5 sm:px-4 sm:pt-10 ${isMypage ? 'scrollbar-hide h-[calc(100vh)] overflow-auto' : ''} `}
      >
        <Container className="max-w-[1280px]">
          <Outlet />
        </Container>
      </div>
      {isDetailPage ? <Footer marginClassName="mb-18.75 md:mb-0" /> : <Footer />}
    </div>
  )
}

export default DefaultLayout
