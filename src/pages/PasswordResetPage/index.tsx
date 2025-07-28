import PasswordResetForm from './components/PasswordResetForm'

const PasswordResetPage = () => {
  return (
    <main className="flex flex-col gap-10">
      <h1 className="text-gray-10 sm:text-pri-900 text-fs24 text-center font-semibold">
        비밀번호 재설정
      </h1>
      <div className="space-y-4 sm:space-y-7">
        <PasswordResetForm />
      </div>
    </main>
  )
}

export default PasswordResetPage
