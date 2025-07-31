import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'
import { Controller, useForm } from 'react-hook-form'
import { loginSchema } from '../../../utils/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from '../../../apis/auth'
import { useDeviceType } from '../../../hooks/useDeviceType'
import { useAdminAuthStore, useAuthStore } from '../../../store/authStore'
import { LoginSchemaType } from '../../../types/auth'
import { adminLogin } from '../../../apis/admin/auth'
import { useToast } from '../../../hooks/useToast'

interface LoginFormProps {
  isAdmin?: boolean
  onSuccessNavigateTo?: string
}

const LoginForm = ({ isAdmin = false, onSuccessNavigateTo = '/' }: LoginFormProps) => {
  const navigate = useNavigate()
  const deviceType = useDeviceType()
  const queryClient = useQueryClient()
  const setIsLogin = useAuthStore(state => state.setIsLogin)
  const { setIsLogin: setIsAdminLogin } = useAdminAuthStore()
  const { showToast } = useToast()

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
    mutationFn: isAdmin ? adminLogin : login,
    onSuccess: async data => {
      switch (data.statusCode) {
        case 200: {
          const accessToken = data.data.accessToken
          sessionStorage.setItem(isAdmin ? 'adminAccessToken' : 'userAccessToken', accessToken)

          if (isAdmin) setIsAdminLogin(true)
          else setIsLogin(true)

          await queryClient.invalidateQueries({
            queryKey: [isAdmin ? 'adminProfile' : 'userProfile'],
          })

          showToast({ type: 'success', msg: '로그인 되었습니다.' })
          navigate(onSuccessNavigateTo)
          break
        }
        case 10008:
          showToast({ type: 'error', msg: '해당 계정은 차단되어 로그인이 불가능합니다.' })
          break
        default:
          showToast({ type: 'error', msg: '로그인 중 오류가 발생했습니다.' })
      }
    },
    onError: () => {
      showToast({ type: 'error', msg: '로그인 중 오류가 발생했습니다.' })
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
            error={!!errors.email}
            errorMsg={errors.email?.message}
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
            error={!!errors.password}
            errorMsg={errors.password?.message}
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
