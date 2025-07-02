import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const navigate = useNavigate()

  const handleGoToLogin = () => {
    navigate('/login')
  }
  return (
    <>
      <div>MainPage 25.07.02 11:22</div>
      <button onClick={handleGoToLogin}>로그인 페이지로 이동</button>
    </>
  )
}

export default MainPage
