import CloseIcon from '@/assets/icons/x.svg?react'
import { Controller, useForm } from 'react-hook-form'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import { forgotPasswordSchema } from '../../../utils/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPasswordSchemaType } from '../../../types/auth'
import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '../../../apis/auth'
import { useToast } from '../../../hooks/useToast'

interface ForgotPasswordFormProps {
  onClose: () => void
}

const ForgotPasswordForm = ({ onClose }: ForgotPasswordFormProps) => {
  const { showToast } = useToast()

  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onSubmit', // 폼 제출 시, 검증
    reValidateMode: 'onSubmit', // 폼 한 번 제출 후, 다시 제출 시 검증
  })

  const emailValue = watch('email')

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: data => {
      switch (data.statusCode) {
        case 200:
          showToast({
            type: 'success',
            msg: '비밀번호 재설정 안내 메일을 발송했습니다.\n 메일이 오지 않으면 스팸함을 확인해주세요.',
          })
          onClose()
          break
        default:
          showToast({
            type: 'error',
            msg: '비밀번호 재설정 안내 메일 발송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
          })
      }
    },
    onError: () => {
      showToast({
        type: 'error',
        msg: '비밀번호 재설정 안내 메일 발송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      })
    },
  })

  const onSubmitForgotPassword = (data: ForgotPasswordSchemaType) => {
    mutation.mutate(data)
  }

  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <div className="flex justify-between">
          <h2 className="text-fs20 font-semibold">비밀번호 찾기</h2>
          <CloseIcon className="cursor-pointer" onClick={onClose} />
        </div>
        <p className="font-fs14 text-gray-500">
          입력하신 이메일로 비밀번호 재설정 링크가 전송됩니다.
          <br />
          이메일 주소를 정확히 입력해 주세요.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmitForgotPassword)} className="space-y-7">
        <div className="mb-1 font-medium">이메일 주소</div>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              label="datcha@datcha.co.kr"
              id="email"
              value={field.value}
              onChange={e => {
                field.onChange(e)
                if (errors.email) clearErrors('email')
              }}
              error={!!errors.email}
              errorMsg={errors.email?.message}
              shape="underline"
            />
          )}
        />
        <Button
          text="비밀번호 재설정 안내 메일 발송하기"
          type="submit"
          disabled={!emailValue}
          className={
            'bg-pri-500 text-gray-10 w-full disabled:border-transparent disabled:bg-gray-50 disabled:text-gray-500'
          }
        />
      </form>
    </div>
  )
}

export default ForgotPasswordForm
