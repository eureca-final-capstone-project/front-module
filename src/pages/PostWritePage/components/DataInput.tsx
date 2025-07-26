import { Controller, useFormContext } from 'react-hook-form'
import DropDown from '../../../components/DropDown/DropDown'
import Input from '../../../components/Input/Input'
import { formatNumberWithComma } from '../../../utils/format'
import Button from '../../../components/Button/Button'

const unitOption = ['MB', 'GB']
const sellableDataMb = 230 // 전역 상태 관리 필요

const DataInput = () => {
  const {
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext()

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
            options={unitOption}
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
                const numberValue = rawValue === '' ? '' : Number(rawValue)
                field.onChange(numberValue)
                if (errors.salesDataAmount) clearErrors('salesDataAmount')
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
          setValue('salesDataAmount', sellableDataMb)
          if (errors.salesDataAmount) clearErrors('salesDataAmount')
        }}
      />
    </div>
  )
}

export default DataInput
