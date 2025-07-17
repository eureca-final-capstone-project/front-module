import { FormEvent, useState } from 'react'
import Button from '../../../components/Button/Button'
import FloatingLabelInput from '../../../components/FloatingLabelInput/FloatingLabelInput'
import { validateEmail } from '../../../utils/validation'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validateLoginForm = () => {
    const errors: { email?: string; password?: string } = {}

    const emailError = validateEmail(email)
    console.log(emailError)
    if (emailError) errors.email = emailError

    return errors
  }

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()

    const validationErrors = validateLoginForm()
    setErrors(validationErrors)
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-10">
      <FloatingLabelInput
        label="이메일"
        id="email"
        value={email}
        error={errors.email}
        onChange={e => {
          setEmail(e.target.value)
          if (errors.email) setErrors(prev => ({ ...prev, email: undefined }))
        }}
      />
      <FloatingLabelInput
        label="비밀번호"
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        text="로그인"
        type="submit"
        disabled={!email || !password}
        className={email && password ? 'bg-pri-500 text-gray-10' : 'bg-gray-50 text-gray-500'}
      />
    </form>
  )
}

export default LoginForm
