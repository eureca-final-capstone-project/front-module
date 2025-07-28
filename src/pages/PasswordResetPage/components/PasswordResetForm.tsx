import { Controller, useForm } from 'react-hook-form'
import Input from '../../../components/Input/Input'
import { useDeviceType } from '../../../hooks/useDeviceType'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordResetSchemaType } from '../../../types/auth'
import { passwordChangeSchema } from '../../../utils/validation'
import Button from '../../../components/Button/Button'

const PasswordResetForm = () => {
  const deviceType = useDeviceType()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordResetSchemaType>({
    resolver: zodResolver(passwordChangeSchema),
    mode: 'all',
  })

  const passwordValue = watch('newPassword')
  const passwordConfirmValue = watch('confirmPassword')

  const isActive =
    passwordValue && passwordConfirmValue && !errors.newPassword && !errors.confirmPassword

  const handlePasswordReset = (data: PasswordResetSchemaType) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(handlePasswordReset)} className="flex flex-col gap-5 sm:gap-10">
      <Controller
        name="newPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            label="새 비밀번호 *"
            id="newPassword"
            type="password"
            value={field.value}
            onChange={e => {
              field.onChange(e)
            }}
            error={!!errors.newPassword}
            errorMsg={errors.newPassword?.message}
            shape={deviceType === 'mobile' ? 'square' : 'floating'}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            label="새 비밀번호 확인*"
            id="confirmPassword"
            type="password"
            value={field.value}
            onChange={e => {
              field.onChange(e)
            }}
            error={!!errors.confirmPassword}
            errorMsg={errors.confirmPassword?.message}
            shape={deviceType === 'mobile' ? 'square' : 'floating'}
          />
        )}
      />
      <Button
        text="비밀번호 재설정하기"
        type="submit"
        disabled={!isActive}
        className={
          'border-gray-10 text-gray-10 sm:bg-pri-500 sm:text-gray-10 mt-12.5 w-full border bg-transparent disabled:border-transparent disabled:bg-gray-50/50 disabled:text-gray-200 sm:mt-0 sm:border-none sm:disabled:bg-gray-50 sm:disabled:text-gray-500'
        }
      />
    </form>
  )
}

export default PasswordResetForm
