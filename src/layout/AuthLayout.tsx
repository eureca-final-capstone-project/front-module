import HeroImg from '@/assets/images/hero.png'
import Logo from '@/assets/images/logo.svg'
import BackgroundGridImg from '@/assets/images/background-grid.png'
import { Outlet } from 'react-router-dom'
import { useDeviceType } from '../hooks/useDeviceType'

const AuthLayout = () => {
  const deviceType = useDeviceType()

  return (
    <div className="bg-pri-gradation flex h-screen w-full flex-col items-center overflow-hidden">
      <header className="text-gray-10 h-[10vh] w-full max-w-[1280px] p-4">
        <img src={Logo} alt="로고" className="h-full" />
      </header>

      <div className="flex w-full flex-1 items-center justify-center px-4">
        {deviceType === 'desktop' ? (
          <div className="relative flex h-full max-h-[90vh]">
            <img src={HeroImg} alt="히어로 이미지" className="h-full object-cover" />
            <p className="text-gray-10 absolute top-1/4 right-1/2 -translate-x-1/2 text-[clamp(1vh,2vh,3vh)] font-bold">
              데이터 거래를 쉽고 안전하게,
              <br /> 신뢰할 수 있는 거래 플랫폼 <br />
              <div className="inline-block h-[clamp(2vh,3vh,4vh)]">
                <img src={Logo} alt="로고" className="h-full" />
              </div>
              입니다
            </p>
          </div>
        ) : (
          <div className="absolute right-0 h-full max-h-[90vh]">
            <img src={BackgroundGridImg} alt="그리드 배경" className="h-full" />
          </div>
        )}

        <div className="bg-gray-10 h-full max-h-[589px] w-full max-w-[444px] rounded-[12px] p-10 text-center lg:z-10 lg:-ml-40 lg:flex-shrink-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
