import { useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button'
import Graph from '../components/Graph/Graph'
import { barData, lineData } from '../mocks/graphData'

const MainPage = () => {
  const navigate = useNavigate()

  const handleGoToLogin = () => {
    navigate('/login')
  }
  return (
    <>
      <div>MainPage 25.07.02 11:22</div>
      <button onClick={handleGoToLogin}>로그인 페이지로 이동</button>
      <div className="flex gap-4">
        <Button text="버튼" disabled={true} className="flex-1 bg-gray-50 text-gray-500" />
        <Button text="버튼" className="bg-pri-700 w-full flex-2 text-white" />
      </div>
      <Graph type="line" data={lineData} yKeys={['u+', 'kt', 'skt']} />
      <Graph type="bar" data={barData} yKeys={['거래량']} />
    </>
  )
}

export default MainPage
