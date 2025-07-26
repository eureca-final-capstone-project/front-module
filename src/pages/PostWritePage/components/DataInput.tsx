import { Controller, useFormContext } from 'react-hook-form'
import DropDown from '../../../components/DropDown/DropDown'
import Input from '../../../components/Input/Input'
import { formatNumberWithComma } from '../../../utils/format'
import Button from '../../../components/Button/Button'
import { useUserStore } from '../../../store/userStore'

const DataInput = () => {
  const sellableDataMb = useUserStore(state => state.data?.sellableDataMb ?? 0)

  const {
    control,
    setValue,
    setError,
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
                const numberValue = rawValue === '' ? '' : Number(rawValue)

                // 입력 데이터가 판매 가능 데이터를 초과하면 에러 처리
                if (
                  typeof numberValue === 'number' &&
                  !isNaN(numberValue) &&
                  numberValue > sellableDataMb
                ) {
                  setError('salesDataAmount', {
                    message: `판매 가능한 데이터 양 범위 내에서 입력해 주세요.`,
                  })
                } else {
                  clearErrors('salesDataAmount') // 조건을 만족하면 에러 초기화
                }

                field.onChange(numberValue)
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
