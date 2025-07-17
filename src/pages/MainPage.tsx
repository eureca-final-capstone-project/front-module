import { useNavigate } from 'react-router-dom'
import FloatingLabelInput from '../components/FloatingLabelInput/FloatingLabelInput'
import { useState } from 'react'
import Button from '../components/Button/Button'

const MainPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')

  const handleGoToLogin = () => {
    navigate('/login')
  }
  return (
    <>
      <div>MainPage 25.07.02 11:22</div>
      <button onClick={handleGoToLogin}>로그인 페이지로 이동</button>
      <FloatingLabelInput
        id="name"
        label="이름"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <div className="flex gap-4">
        <Button text="버튼" disabled={true} className="flex-1 bg-gray-50 text-gray-500" />
        <Button text="버튼" className="bg-pri-700 w-full flex-2 text-white" />
      </div>
    </>
  )
}

export default MainPage
