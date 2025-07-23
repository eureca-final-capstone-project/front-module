import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import LoginForm from './components/LoginForm'
import SocialLogin from './components/SocialLogin'

const LoginPage = () => {
  const navigate = useNavigate()

  return (
    <main className="flex flex-col gap-10">
      <h1 className="text-gray-10 sm:text-pri-900 text-fs24 text-center font-semibold">로그인</h1>
      <div className="space-y-4 sm:space-y-7">
        <LoginForm />
        <div className="text-fs14 font-regular space-x-3 text-right text-gray-100 sm:text-gray-700">
          <Button text="회원가입" onClick={() => navigate('/sign-up')} shape="underline" />
          <span>|</span>
          <Button text="비밀번호 찾기" onClick={() => {}} shape="underline" />
        </div>
      </div>
      <SocialLogin />
    </main>
  )
}

export default LoginPage
