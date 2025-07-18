import Button from '../../../components/Button/Button'
import FloatingLabelInput from '../../../components/FloatingLabelInput/FloatingLabelInput'
import { Controller, useForm } from 'react-hook-form'
import { loginSchema, LoginSchemaType } from '../../../utils/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { login } from '../../../apis/auth'

const LoginForm = () => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit', // 폼 제출 시, 검증
    reValidateMode: 'onSubmit', // 폼 한 번 제출 후, 다시 제출 시 재검증
  })

  const emailValue = watch('email')
  const passwordValue = watch('password')
  const isActive = emailValue && passwordValue

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/')
    },
    onError: error => {
      alert('로그인 실패')
      console.error(error)
    },
  })

  const handleLogin = (data: LoginSchemaType) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-10">
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FloatingLabelInput
            label="이메일"
            id="email"
            value={field.value}
            onChange={e => {
              field.onChange(e)
              if (errors.email) clearErrors('email')
            }}
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FloatingLabelInput
            label="비밀번호"
            id="password"
            type="password"
            value={field.value}
            onChange={e => {
              field.onChange(e)
              if (errors.password) clearErrors('password') // 🚩 변경 시 해당 에러 초기화
            }}
            error={errors.password?.message}
          />
        )}
      />
      <Button
        text="로그인"
        type="submit"
        disabled={!isActive}
        className="bg-pri-500 text-gray-10 disabled:bg-gray-50 disabled:text-gray-500"
      />
    </form>
  )
}

export default LoginForm
