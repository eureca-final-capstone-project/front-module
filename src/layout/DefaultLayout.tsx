import { Outlet } from 'react-router-dom'
import Container from '../components/Container/Container'
import Header from '../components/Header/Header'
import { useState } from 'react'

const DefaultLayout = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  return (
    <div className="bg-background flex min-h-[100vh] flex-col items-center">
      <Header showMobileSearch={showMobileSearch} setShowMobileSearch={setShowMobileSearch} />
      <main
        className={`transition-margin w-full flex-1 px-4 pt-6 duration-400 ease-in-out sm:mt-21.5 sm:pt-10 ${showMobileSearch ? 'mt-31.5 sm:mt-16' : 'mt-16'}`}
      >
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  )
}

export default DefaultLayout
