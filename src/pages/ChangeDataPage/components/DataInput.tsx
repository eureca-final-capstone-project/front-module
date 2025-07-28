import { Controller, useFormContext } from 'react-hook-form'
import DropDown from '../../../components/DropDown/DropDown'
import Input from '../../../components/Input/Input'
import { formatNumberWithComma } from '../../../utils/format'
import Button from '../../../components/Button/Button'
import { useUserStore } from '../../../store/userStore'
import { validateChangeDataAmount } from '../../../utils/validation'
import { useEffect } from 'react'

const DataInput = () => {
  const totalDataMb = useUserStore(state => state.data?.totalDataMb ?? 0)

  const {
    control,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext()

  const unit = watch('unit')
  const changeDataAmount = watch('changeDataAmount')

  useEffect(() => {
    if (changeDataAmount === '' || changeDataAmount === undefined) return

    const { isValid, message } = validateChangeDataAmount(unit, changeDataAmount, totalDataMb)
    if (!isValid) setError('changeDataAmount', { message })
    else clearErrors('changeDataAmount')
  }, [unit, changeDataAmount, setError, clearErrors, totalDataMb])

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
            className="w-18.75"
            paddingClassName="px-2.5 py-4"
          />
        )}
      />

      {/* 데이터 입력 */}
      <Controller
        name="changeDataAmount"
        control={control}
        defaultValue=""
        render={({ field }) => {
          const formattedValue = formatNumberWithComma(field.value.toString())
          return (
            <Input
              label="전환할 데이터 양을 입력해주세요."
              id="changeDataAmount"
              value={formattedValue}
              onChange={e => {
                const rawValue = e.target.value.replace(/,/g, '').replace(/[^0-9]/g, '')
                const numberValue = rawValue === '' ? NaN : Number(rawValue)

                field.onChange(isNaN(numberValue) ? '' : numberValue)
              }}
              error={!!errors.changeDataAmount}
              errorMsg={errors.changeDataAmount?.message?.toString() || ''}
            />
          )
        }}
      />

      <Button
        text="전체 판매"
        className="bg-pri-500 text-gray-10 max-h-13"
        onClick={() => {
          const value = unit === 'GB' ? parseFloat((totalDataMb / 1000).toFixed(1)) : totalDataMb

          setValue('changeDataAmount', value)
          if (errors.changeDataAmount) clearErrors('changeDataAmount')
        }}
      />
    </div>
  )
}

export default DataInput
