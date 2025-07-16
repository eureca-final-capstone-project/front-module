import { Outlet } from 'react-router-dom'
import Container from '../components/Container/Container'
import LogoPrimary from '@/assets/images/logo-primary.svg'

const DefaultLayout = () => {
  return (
    <div className="bg-background flex min-h-[100vh] flex-col items-center">
      <header className="bg-gray-10 fixed flex h-16 w-full items-center p-4 sm:h-21.5">
        <Container className="flex justify-between">
          <img src={LogoPrimary} alt="로고" className="h-full" />
          <div className="self-end">검색바</div>
          <div>
            <nav>로그인</nav>
            <nav>거래</nav>
          </div>
        </Container>
      </header>
      <main className="mt-16 w-full flex-1 px-4 pt-6 sm:mt-21.5 sm:pt-10">
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  )
}

export default DefaultLayout
