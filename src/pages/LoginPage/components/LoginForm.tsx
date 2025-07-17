import { useState } from 'react'
import Button from '../../../components/Button/Button'
import FloatingLabelInput from '../../../components/FloatingLabelInput/FloatingLabelInput'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <form className="flex flex-col gap-10">
      <FloatingLabelInput
        label="이메일"
        id="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <FloatingLabelInput
        label="비밀번호"
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        text="로그인"
        disabled={!email || !password}
        className={email && password ? 'bg-pri-500 text-gray-10' : 'bg-gray-50 text-gray-500'}
      />
    </form>
  )
}

export default LoginForm
