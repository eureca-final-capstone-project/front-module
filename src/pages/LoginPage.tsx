import UserGreeting from '../components/testCompo'

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <UserGreeting username="예지" isLoggedIn={true} />
    </div>
  )
}

export default LoginPage
