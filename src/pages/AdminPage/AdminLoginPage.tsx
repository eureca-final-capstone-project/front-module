import LoginForm from '../LoginPage/components/LoginForm'

const AdminLoginPage = () => {
  return (
    <main className="flex flex-col gap-10">
      <h1 className="text-gray-10 sm:text-pri-900 text-fs24 text-center font-semibold">
        관리자 로그인
      </h1>
      <LoginForm isAdmin={true} onSuccessNavigateTo={'/admin/dashboard'} />
    </main>
  )
}

export default AdminLoginPage
