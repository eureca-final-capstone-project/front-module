import { Outlet } from 'react-router-dom'
import Container from '../components/Container/Container'
import Header from '../components/Header/Header'

const DefaultLayout = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center">
      <Header />
      <main className="mt-16 w-full flex-1 pt-6 sm:mt-21.5 sm:px-4 sm:pt-10">
        <Container className="max-w-[1280px]">
          <Outlet />
        </Container>
      </main>
    </div>
  )
}

export default DefaultLayout
