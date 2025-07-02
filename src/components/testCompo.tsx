type UserGreetingProps = {
  username: string
  isLoggedIn: boolean
}

const UserGreeting = ({ username, isLoggedIn }: UserGreetingProps) => {
  return <div>{isLoggedIn ? `웰컴, ${username}!` : '로그인 필요'}</div>
}

export default UserGreeting
