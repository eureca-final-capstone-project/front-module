import { Link } from 'react-router-dom'
import Logo from '@/assets/images/logo-primary.svg?react'

const NotFoundPage = () => {
  return (
    <div className="bg-gray-10 relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-pri-500 text-7xl leading-none font-bold sm:text-9xl">404</h1>
      <h2 className="text-fs20 sm:text-fs28 mt-4 font-bold text-gray-800">
        페이지를 찾을 수 없어요.
      </h2>
      <p className="text-fs14 sm:text-fs16 mt-4 text-gray-700">
        요청하신 페이지가 존재하지 않거나,
        <br className="block sm:hidden" /> 이동되었을 수 있어요.
      </p>
      <Link
        to="/"
        className="bg-pri-500 hover:bg-pri-400 sm:text-fs16 text-fs14 text-gray-10 shadow-button mt-6 rounded-md px-3 py-3 transition sm:px-6"
      >
        홈으로 돌아가기
      </Link>

      <div className="absolute bottom-4">
        <Logo className="h-20 w-20 sm:h-25 sm:w-25" />
      </div>
    </div>
  )
}

export default NotFoundPage
