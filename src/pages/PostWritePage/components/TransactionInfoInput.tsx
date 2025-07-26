import { Controller, useFormContext } from 'react-hook-form'

import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import { formatNumberWithComma } from '../../../utils/format'
import DatchaCoinIcon from '@/assets/icons/datcha-coin.svg?react'

const TransactionInfoInput = () => {
  const {
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext()

  const options = [
    { label: '일반 판매', value: 1 },
    { label: '입찰 판매', value: 2 },
  ]

  return (
    <div className="space-y-5">
      {/* 거래 방식 선택 */}
      <Controller
        name="transactionMethod"
        control={control}
        defaultValue={1}
        render={({ field }) => (
          <div className="flex gap-2">
            {options.map(option => (
              <Button
                text={option.label}
                key={option.value}
                onClick={() => field.onChange(option.value)}
                className={`border px-2 py-1.5 ${
                  field.value === option.value
                    ? 'bg-pri-500 border-pri-500 text-gray-10'
                    : 'bg-background border-gray-400 text-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      />

      {/* 가격 입력 */}
      <Controller
        name="price"
        control={control}
        defaultValue=""
        render={({ field }) => {
          const formattedValue = formatNumberWithComma(field.value.toString())
          return (
            <Input
              label="가격을 입력해주세요"
              id="price"
              value={formattedValue}
              onChange={e => {
                // 콤마 제거 + 숫자만 필터링
                const rawValue = e.target.value.replace(/,/g, '').replace(/[^0-9]/g, '')
                field.onChange(rawValue)
                if (errors.price) clearErrors('price')
              }}
              error={!!errors.price}
              errorMsg={errors.price?.message?.toString() || ''}
              prefix={<DatchaCoinIcon className="h-6 w-6" />}
              suffix="원"
            />
          )
        }}
      />
    </div>
  )
}

export default TransactionInfoInput
