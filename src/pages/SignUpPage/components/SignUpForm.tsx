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

const SignUpForm = () => {
  const deviceType = useDeviceType()

  const {
    control,
    handleSubmit,
    watch,

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

  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const requiredAgreementsChecked = agreements
    .filter(item => item.required)
    .every(item => checked[item.id])

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
    setChecked(prev => ({ ...prev, [id]: value }))
  }

  const handleSignUp = (data: SignUpSchemaType) => {
    console.log('회원가입 성공 ', data)
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 sm:gap-10">
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
              }}
              error={errors.email?.message}
              shape={deviceType === 'mobile' ? 'square' : 'floating'}
              suffix={
                <Button
                  text="중복확인"
                  shape="underline"
                  className={`text-fs14 group-hover:text-gray-700 group-focus:text-gray-700 sm:text-gray-700 ${
                    field.value ? 'text-gray-700' : 'text-gray-200'
                  }`}
                  onClick={() => alert('중복확인')}
                />
              }
              suffixAlwaysVisible={true}
            />
          )}
        />
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
              error={errors.password?.message}
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
              error={errors.passwordConfirm?.message}
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
                error={errors.phoneNumber?.message}
                shape={deviceType === 'mobile' ? 'square' : 'floating'}
              />
            )}
          />
        </div>
      </div>

      <Agreement checked={checked} onChange={handleAgreementChange} />

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
