import BackIcon from '@/assets/icons/back.svg?react'
import { Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom'
import Container from '../components/Container/Container'

const WebMobileLayout = () => {
  const navigate = useNavigate()

  // 현재 경로에 매칭된 라우트 배열에서 타이틀을 가져와 헤더에 표시
  const matches = useMatches() as { handle?: { title?: string; showBackIcon?: boolean } }[]
  const match = matches.reverse().find(match => match.handle?.title)
  const title = match?.handle?.title ?? ''
  const showBackIcon = match?.handle?.showBackIcon !== false

  const location = useLocation()
  const backTo = location.state?.backTo

  const handleBack = () => {
    if (backTo) {
      navigate(backTo)
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="bg-background flex h-full min-h-screen flex-col">
      <header className="bg-gray-10 fixed z-50 flex h-16 w-full items-center p-4 shadow-xs sm:h-21.5">
        <Container className="relative flex max-w-[640px] items-center justify-center">
          {showBackIcon && (
            <BackIcon
              className="absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer text-gray-900"
              onClick={handleBack}
            />
          )}
          <h1 className="text-fs20 font-medium">{title}</h1>
        </Container>
      </header>
      <div className="mt-16 w-full flex-1 pt-6 sm:mt-21.5 sm:pt-10">
        <Container className="max-w-[640px]">
          <Outlet />
        </Container>
      </div>
    </div>
  )
}

export default WebMobileLayout
