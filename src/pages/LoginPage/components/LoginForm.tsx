import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'
import { Controller, useForm } from 'react-hook-form'
import { loginSchema, LoginSchemaType } from '../../../utils/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { login } from '../../../apis/auth'
import { useDeviceType } from '../../../hooks/useDeviceType'
import { useAuthStore } from '../../../store/authStore'

const LoginForm = () => {
  const navigate = useNavigate()
  const deviceType = useDeviceType()

  const setIsLogin = useAuthStore(state => state.setIsLogin)

  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit', // 폼 제출 시, 검증
    reValidateMode: 'onSubmit', // 폼 한 번 제출 후, 다시 제출 시 검증
  })

  const emailValue = watch('email')
  const passwordValue = watch('password')
  const isActive = emailValue && passwordValue

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: data => {
      if (data.statusCode === 200) {
        const accessToken = data.data.accessToken
        sessionStorage.setItem('accessToken', accessToken)
        setIsLogin(true)
        navigate('/')
      } else {
        alert('로그인 실패: ' + data.message)
      }
    },
    onError: error => {
      alert('로그인 실패 ' + error.message)
    },
  })

  const handleLogin = (data: LoginSchemaType) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-5 sm:gap-10">
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            label="이메일"
            id="email"
            value={field.value}
            onChange={e => {
              field.onChange(e)
              if (errors.email) clearErrors('email')
            }}
            error={errors.email?.message}
            shape={deviceType === 'mobile' ? 'square' : 'floating'}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            label="비밀번호"
            id="password"
            type="password"
            value={field.value}
            onChange={e => {
              field.onChange(e)
              if (errors.password) clearErrors('password')
            }}
            error={errors.password?.message}
            shape={deviceType === 'mobile' ? 'square' : 'floating'}
          />
        )}
      />
      <Button
        text="로그인"
        type="submit"
        disabled={!isActive}
        className={
          'border-gray-10 text-gray-10 sm:bg-pri-500 sm:text-gray-10 mt-12.5 w-full border bg-transparent disabled:border-transparent disabled:bg-gray-50/50 disabled:text-gray-200 sm:mt-0 sm:border-none sm:disabled:bg-gray-50 sm:disabled:text-gray-500'
        }
      />
    </form>
  )
}

export default LoginForm
