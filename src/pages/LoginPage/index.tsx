import LoginForm from './components/LoginForm'

const LoginPage = () => {
  return (
    <main className="flex flex-col gap-10">
      <h1 className="text-fs24 font-bold">로그인</h1>
      <div className="space-y-7">
        <LoginForm />
        <div className="text-fs14 font-regular space-x-3 text-right">
          <button
            onClick={() => {}}
            className="cursor-pointer border-b border-gray-700 text-sm text-gray-700"
          >
            회원가입
          </button>
          <span className="text-gray-700">|</span>
          <button
            onClick={() => {}}
            className="cursor-pointer border-b border-gray-700 text-sm text-gray-700"
          >
            비밀번호 찾기
          </button>
        </div>
      </div>
      <div className="space-y-8">
        <div className="font-fs14 font-medium">SNS 계정으로 간편하게 시작하기</div>
        <div className="flex justify-evenly">
          <div>카카오 로그인</div>
          <div>구글 로그인</div>
          <div>애플 로그인</div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
