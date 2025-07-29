import { Controller, useFormContext } from 'react-hook-form'
import { RefundSchemaType } from '../../../types/pay'
import Input from '../../../components/Input/Input'
import DatchaCoin from '@/assets/icons/datcha-coin-color.svg?react'

interface RefundPayInputProps {
  balance: number
}

const RefundPayInput = ({ balance }: RefundPayInputProps) => {
  const {
    control,
    watch,
    formState: { errors },
    clearErrors,
  } = useFormContext<RefundSchemaType>()

  const refundAmount = watch('refundAmount')
  const rawValue = refundAmount?.replace(/,/g, '') ?? ''
  const formattedValue = rawValue === '' ? '' : Number(rawValue).toLocaleString()

  const isExceedingBalance = Number(rawValue) > balance
  const errorMessage =
    errors.refundAmount?.message ||
    (rawValue && isExceedingBalance ? '보유한 페이보다 큰 금액입니다.' : '')

  return (
    <>
      <Controller
        name="refundAmount"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            id="refundAmount"
            label="환전하실 페이 금액을 입력해주세요."
            type="text"
            value={formattedValue}
            onChange={e => {
              const input = e.target.value.replace(/,/g, '')
              if (/^\d*$/.test(input)) {
                field.onChange(input)
                if (errors.refundAmount) clearErrors('refundAmount')
              }
            }}
            error={!!errorMessage}
            errorMsg={errorMessage}
            shape="square"
            prefix={
              <DatchaCoin
                className={`h-6 w-6 stroke-2 ${errorMessage ? 'text-error' : 'text-gray-900'}`}
              />
            }
            suffix="원"
            suffixAlwaysVisible={true}
          />
        )}
      />
    </>
  )
}

export default RefundPayInput
