import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'

type RangeInputType = 'dataAmount' | 'price'

interface RangeInputProps {
  idPrefix: string
  type: RangeInputType
  minValue: string
  maxValue: string
  onChangeMin: (value: string) => void
  onChangeMax: (value: string) => void
  onApply?: () => void
  placeholderMin?: string
  placeholderMax?: string
  error?: boolean
  errorMessage?: string
  selectedMin?: string
  selectedMax?: string
  onResetSelected?: () => void
}

const RangeInput = ({
  idPrefix,
  type: rangeType,
  minValue,
  maxValue,
  onChangeMin,
  onChangeMax,
  onApply,
  placeholderMin = '0',
  placeholderMax = '0',
  error = false,
  errorMessage = '',
}: RangeInputProps) => {
  const isApplyDisabled = error || minValue === '' || maxValue === ''

  const handleMinChange = (value: string) => {
    onChangeMin(value)
  }

  const handleMaxChange = (value: string) => {
    onChangeMax(value)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2.5">
        <Input
          id={`${idPrefix}-min`}
          type="number"
          value={minValue}
          onChange={e => handleMinChange(e.target.value)}
          error={error}
          errorMsg=""
          label={placeholderMin}
          suffix={rangeType === 'dataAmount' ? 'MB' : '원'}
          suffixAlwaysVisible
          className="input-no-spinner rounded-xs px-2.5 py-3 sm:px-1 sm:py-1 lg:px-2 lg:py-2"
        />
        <span className="text-gray-800">-</span>
        <Input
          id={`${idPrefix}-max`}
          type="number"
          value={maxValue}
          onChange={e => handleMaxChange(e.target.value)}
          error={error}
          errorMsg=""
          label={placeholderMax}
          suffix={rangeType === 'dataAmount' ? 'MB' : '원'}
          suffixAlwaysVisible
          className="input-no-spinner rounded-xs px-2.5 py-3 sm:px-1 sm:py-1 lg:px-2 lg:py-2"
        />
      </div>
      {error && errorMessage && <span className="text-fs14 text-error">{errorMessage}</span>}
      {onApply && (
        <div className="flex items-center justify-between">
          <p className="text-fs14 text-gray-700">
            범위를 입력 후 <span className="font-medium text-gray-800">적용</span>해보세요!
          </p>
          <Button
            text="적용하기"
            shape="underline"
            onClick={onApply}
            disabled={isApplyDisabled}
            className="text-fs14 hidden self-start text-gray-700 sm:block"
          />
        </div>
      )}
    </div>
  )
}

export default RangeInput
