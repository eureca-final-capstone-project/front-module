import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'
import { Controller, useForm } from 'react-hook-form'
import { signUpSchema } from '../../../utils/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDeviceType } from '../../../hooks/useDeviceType'
import { SignUpSchemaType } from '../../../types/auth'
import Agreement from './Agreement'
import { useState } from 'react'
import { agreements } from '../../../constants/agreements'
import DropDown from '../../../components/DropDown/DropDown'
import { formatPhoneNumber } from '../../../utils/format'
import { CARRIER_ID_MAP } from '../../../constants/carrier'
import { useMutation } from '@tanstack/react-query'
import { checkEmailDuplicate, signUp } from '../../../apis/auth'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../../hooks/useToast'

const SignUpForm = () => {
  const navigate = useNavigate()
  const deviceType = useDeviceType()

  const { showToast } = useToast()

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    mode: 'all', // 필드 값 변경 시, 검증
  })

  const emailValue = watch('email')
  const passwordValue = watch('password')
  const passwordConfirmValue = watch('passwordConfirm')
  const carrier = watch('carrier')
  const phoneNumberValue = watch('phoneNumber')

  const [isEmailChecked, setIsEmailChecked] = useState<boolean | null>(null)
  const [isEmailDuplicated, setIsEmailDuplicated] = useState<boolean | null>(null)
  const [agreemnetChecked, setAgreementChecked] = useState<Record<string, boolean>>({})

  const requiredAgreementsChecked = agreements
    .filter(item => item.required)
    .every(item => agreemnetChecked[item.id])

  const isActive =
    emailValue &&
    passwordValue &&
    passwordConfirmValue &&
    carrier &&
    phoneNumberValue &&
    !errors.email &&
    !errors.password &&
    !errors.passwordConfirm &&
    !errors.phoneNumber &&
    requiredAgreementsChecked

  const handleAgreementChange = (id: string, value: boolean) => {
    setAgreementChecked(prev => ({ ...prev, [id]: value }))
  }

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: data => {
      switch (data.statusCode) {
        case 200:
          showToast({
            type: 'success',
            msg: '이메일 인증 링크가 발송되었습니다. 메일함에서 인증을 완료한 후 로그인해 주세요.',
          })
          navigate('/login')
          break
        default:
          showToast({
            type: 'error',
            msg: '회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.',
          })
      }
    },
    onError: () => {
      showToast({
        type: 'error',
        msg: '회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      })
    },
  })

  const handleEmailDuplicateCheck = async () => {
    if (!emailValue) {
      setError('email', { message: '이메일을 입력해 주세요.' })
      return
    }

    if (errors.email) return

    try {
      const response = await checkEmailDuplicate(emailValue)
      if (response.data) {
        setIsEmailDuplicated(true)
        setError('email', { message: '이미 사용 중인 이메일입니다.' })
      } else {
        setIsEmailDuplicated(false)
        clearErrors('email')
      }
      setIsEmailChecked(true)
    } catch {
      showToast({
        type: 'error',
        msg: '이메일 중복 확인에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      })
    }
  }

  const handleSignUp = (data: SignUpSchemaType) => {
    if (!isEmailChecked) {
      setIsEmailChecked(false)
      return
    }

    const payload = {
      email: data.email,
      password: data.password,
      telecomCompanyId: CARRIER_ID_MAP[data.carrier],
      phoneNumber: data.phoneNumber.replace(/-/g, ''),
      provider: '일반',
    }
    mutation.mutate(payload)
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 sm:gap-10">
        <div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                label="이메일 *"
                id="email"
                value={field.value}
                onChange={e => {
                  field.onChange(e)
                  setIsEmailChecked(null)
                  setIsEmailDuplicated(null)
                }}
                error={!!errors.email || isEmailChecked === false}
                errorMsg={errors.email?.message}
                shape={deviceType === 'mobile' ? 'square' : 'floating'}
                suffix={
                  <Button
                    text="중복확인"
                    shape="underline"
                    className={`text-fs14 group-hover:text-gray-700 group-focus:text-gray-700 sm:text-gray-700 ${
                      field.value ? 'text-gray-700' : 'text-gray-200'
                    }`}
                    onClick={handleEmailDuplicateCheck}
                  />
                }
                suffixAlwaysVisible={true}
              />
            )}
          />
          {isEmailChecked === false && (
            <div className="text-fs12 text-error p-1 text-left">이메일 중복 확인을 해주세요.</div>
          )}
          {isEmailChecked && isEmailDuplicated === false && (
            <div className="sm:text-pri-500 text-fs12 p-1 text-left text-gray-100">
              사용 가능한 이메일입니다.
            </div>
          )}
        </div>

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              label="비밀번호 *"
              id="password"
              type="password"
              value={field.value}
              onChange={e => {
                field.onChange(e)
              }}
              error={!!errors.password}
              errorMsg={errors.password?.message}
              shape={deviceType === 'mobile' ? 'square' : 'floating'}
            />
          )}
        />
        <Controller
          name="passwordConfirm"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              label="비밀번호 확인*"
              id="passwordConfirm"
              type="password"
              value={field.value}
              onChange={e => {
                field.onChange(e)
              }}
              error={!!errors.passwordConfirm}
              errorMsg={errors.passwordConfirm?.message}
              shape={deviceType === 'mobile' ? 'square' : 'floating'}
            />
          )}
        />
        <div className="flex gap-2">
          <Controller
            name="carrier"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <DropDown
                type="provider"
                selected={field.value}
                onSelect={field.onChange}
                placeholder="통신사"
                className="w-30"
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                label="휴대폰 번호 *"
                id="phone"
                value={field.value}
                onChange={e => {
                  const formatted = formatPhoneNumber(e.target.value)
                  field.onChange(formatted)
                }}
                error={!!errors.phoneNumber}
                errorMsg={errors.phoneNumber?.message}
                shape={deviceType === 'mobile' ? 'square' : 'floating'}
              />
            )}
          />
        </div>
      </div>

      <Agreement checked={agreemnetChecked} onChange={handleAgreementChange} />

      <Button
        text="이메일 인증하고 가입하기"
        type="submit"
        disabled={!isActive}
        className={
          'border-gray-10 text-gray-10 sm:bg-pri-500 sm:text-gray-10 border bg-transparent disabled:border-transparent disabled:bg-gray-50/50 disabled:text-gray-200 sm:mt-0 sm:border-none sm:disabled:bg-gray-50 sm:disabled:text-gray-500'
        }
      />
    </form>
  )
}

export default SignUpForm
