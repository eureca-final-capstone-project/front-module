import { Controller, useFormContext } from 'react-hook-form'
import { RefundSchemaType } from '../../../types/pay'
import Input from '../../../components/Input/Input'
import DatchaCoin from '@/assets/icons/datcha-coin-color.svg?react'
import Button from '../../../components/Button/Button'

interface RefundPayInputProps {
  balance: number
}

const RefundPayInput = ({ balance }: RefundPayInputProps) => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext<RefundSchemaType>()

  const refundAmount = watch('refundAmount')
  const rawValue = refundAmount?.replace(/,/g, '') ?? ''
  const formattedValue = rawValue === '' ? '' : Number(rawValue).toLocaleString()

  const isExceedingBalance = Number(rawValue) > balance
  const errorMessage =
    errors.refundAmount?.message ||
    (rawValue && isExceedingBalance ? '보유하신 페이보다 큰 금액입니다.' : '')

  const quickAmounts = [1000, 3000, 5000, 10000]

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
            inputMode="numeric"
          />
        )}
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {quickAmounts.map(amount => (
          <Button
            key={amount}
            onClick={() => {
              const current = Number(watch('refundAmount')?.replace(/,/g, '') || 0)
              const newAmount = current + amount
              setValue('refundAmount', newAmount.toString())
              clearErrors('refundAmount')
            }}
            text={<span className="text-sm">{amount.toLocaleString()}원</span>}
            mediumPadding
            className="text-fs16 rounded-2 bg-gray-10 hover:bg-gray-100"
          />
        ))}

        <Button
          onClick={() => {
            setValue('refundAmount', balance.toString())
            clearErrors('refundAmount')
          }}
          text={<span className="text-sm">전액 환전</span>}
          mediumPadding
          className="text-fs16 rounded-2 bg-pri-100 hover:bg-pri-200"
        />
      </div>
    </>
  )
}

export default RefundPayInput
