import { Outlet } from 'react-router-dom'
import Container from '../components/Container/Container'
import Header from '../components/Header/Header'

const DefaultLayout = () => {
  return (
    <div className="bg-background flex min-h-[100vh] flex-col items-center">
      <Header />
      <main className="mt-16 w-full flex-1 px-4 pt-6 sm:mt-21.5 sm:pt-10">
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  )
}

export default DefaultLayout
