import { Controller, useFormContext } from 'react-hook-form'
import DropDown from '../../../components/DropDown/DropDown'
import Input from '../../../components/Input/Input'
import { formatNumberWithComma } from '../../../utils/format'
import Button from '../../../components/Button/Button'
import { useUserStore } from '../../../store/userStore'
import { validateSalesDataAmount } from '../../../utils/validation'
import { useEffect } from 'react'

const DataInput = () => {
  const sellableDataMb = useUserStore(state => state.data?.sellableDataMb ?? 0)

  const {
    control,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext()

  const unit = watch('unit')
  const salesDataAmount = watch('salesDataAmount')

  useEffect(() => {
    if (salesDataAmount === '' || salesDataAmount === undefined) return

    const { isValid, message } = validateSalesDataAmount(unit, salesDataAmount, sellableDataMb)
    if (!isValid) setError('salesDataAmount', { message })
    else clearErrors('salesDataAmount')
  }, [unit, salesDataAmount, setError, clearErrors, sellableDataMb])

  return (
    <div className="flex gap-5">
      <Controller
        name="unit"
        control={control}
        defaultValue="MB"
        render={({ field }) => (
          <DropDown
            selected={field.value}
            onSelect={field.onChange}
            placeholder="단위"
            options={['MB', 'GB']}
            className="w-22"
          />
        )}
      />

      {/* 데이터 입력 */}
      <Controller
        name="salesDataAmount"
        control={control}
        defaultValue=""
        render={({ field }) => {
          const formattedValue = formatNumberWithComma(field.value.toString())
          return (
            <Input
              label="판매할 데이터 양을 입력해주세요."
              id="salesDataAmount"
              value={formattedValue}
              onChange={e => {
                const rawValue = e.target.value.replace(/,/g, '').replace(/[^0-9]/g, '')
                const numberValue = rawValue === '' ? NaN : Number(rawValue)

                const newUnit = numberValue >= 1000 ? 'GB' : 'MB'
                const amount = newUnit === 'GB' ? Math.floor(numberValue / 1000) : numberValue

                setValue('unit', newUnit)
                field.onChange(isNaN(amount) ? '' : amount)
              }}
              error={!!errors.salesDataAmount}
              errorMsg={errors.salesDataAmount?.message?.toString() || ''}
            />
          )
        }}
      />

      <Button
        text="전체 판매"
        className="bg-pri-500 text-gray-10 max-h-13"
        onClick={() => {
          const newUnit = sellableDataMb >= 1000 ? 'GB' : 'MB'
          const amount = newUnit === 'GB' ? Math.floor(sellableDataMb / 1000) : sellableDataMb

          setValue('unit', newUnit)
          setValue('salesDataAmount', amount)

          if (errors.salesDataAmount) clearErrors('salesDataAmount')
        }}
      />
    </div>
  )
}

export default DataInput
