import HeroImg from '@/assets/images/hero.png'
import Logo from '@/assets/images/logo.svg'
import BackgroundGridImg from '@/assets/images/background-grid.png'
import { Outlet } from 'react-router-dom'
import { useDeviceType } from '../hooks/useDeviceType'

const AuthLayout = () => {
  const deviceType = useDeviceType()

  return (
    <div className="bg-pri-gradation flex min-h-screen w-full flex-col items-center overflow-hidden sm:h-screen">
      <header className="text-gray-10 h-16 w-full max-w-[1280px] p-4 sm:h-21.5">
        <img src={Logo} alt="로고" className="h-full" />
      </header>

      <div className="flex w-full flex-1 justify-center px-4 sm:items-center">
        {/* 데스크탑 */}
        <div className="relative hidden h-full max-h-[calc(100vh-86px)] lg:flex">
          <img src={HeroImg} alt="히어로 이미지" className="h-full object-cover" />
          <div className="text-gray-10 absolute top-1/4 right-[42%] -translate-x-1/2 text-[clamp(1vh,2.5vh,3vh)] font-bold">
            데이터 거래를 쉽고 안전하게,
            <br /> 신뢰할 수 있는 거래 플랫폼 <br />
            <div className="flex items-baseline pt-0.5">
              <img src={Logo} alt="로고" className="h-[clamp(2vh,3.5vh,4vh)]" />
              <span>입니다</span>
            </div>
          </div>
        </div>

        {/* 태블릿 */}
        <div className="absolute bottom-0 left-1/2 hidden h-[calc(100vh-64px)] w-full -translate-x-1/2 sm:block sm:h-[calc(100vh-86px)] lg:hidden">
          <img src={BackgroundGridImg} alt="그리드 배경" className="h-full w-full object-cover" />
        </div>

        {deviceType === 'mobile' ? (
          /* 모바일 */
          <div className="mt-11.25 mb-7 w-full sm:hidden">
            <Outlet />
          </div>
        ) : (
          /* 로그인 및 회원가입 모달 박스 */
          <div className="bg-gray-10 z-10 hidden max-h-[80vh] w-full max-w-111 overflow-y-auto rounded-md p-10 text-center sm:block lg:z-10 lg:-ml-40 lg:flex-shrink-0">
            <Outlet />
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthLayout
