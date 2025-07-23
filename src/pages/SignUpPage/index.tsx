import SignUpForm from './components/SignUpForm'

const SignUpPage = () => {
  return (
    <main className="flex flex-col gap-10">
      <h1 className="text-gray-10 sm:text-pri-900 text-fs24 text-center font-semibold">회원가입</h1>
      <div className="space-y-4 sm:space-y-7">
        <SignUpForm />
      </div>
    </main>
  )
}

export default SignUpPage
