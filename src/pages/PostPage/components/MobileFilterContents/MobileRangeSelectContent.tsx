import CheckBox from '../../../../components/CheckBox/CheckBox'
import Button from '../../../../components/Button/Button'
import RangeInput from '../RangeInput'
import { getRangeErrorMessage } from '../../../../utils/validation'
import { useEffect, useMemo, useState } from 'react'
import { FilterState } from '../FilterBar'

export interface RangeOption {
  value: number
  label: string
  minDataAmount?: number
  maxDataAmount?: number
  minPrice?: number
  maxPrice?: number
}

interface MobileRangeSelectContentProps {
  title: string
  options: RangeOption[]
  filterState: {
    selectedDataRange?: number | null
    appliedDataRange?: { min: string; max: string }
    selectedPriceRange?: number | null
    appliedPriceRange?: { min: string; max: string }
  }
  onFilterChange: (updated: Partial<FilterState>) => void
  onApply: () => void
  onReset: () => void
  rangeType: 'dataAmount' | 'price'
}

const MobileRangeSelectContent = ({
  options,
  filterState,
  onFilterChange,
  onApply,
  onReset,
  rangeType,
}: MobileRangeSelectContentProps) => {
  const isData = rangeType === 'dataAmount'

  const selectedRangeIndex = isData
    ? (filterState.selectedDataRange ?? null)
    : (filterState.selectedPriceRange ?? null)

  const currentAppliedRange = useMemo(() => {
    return isData
      ? (filterState.appliedDataRange ?? { min: '', max: '' })
      : (filterState.appliedPriceRange ?? { min: '', max: '' })
  }, [isData, filterState.appliedDataRange, filterState.appliedPriceRange])

  const [tempMin, setTempMin] = useState(currentAppliedRange.min)
  const [tempMax, setTempMax] = useState(currentAppliedRange.max)

  useEffect(() => {
    setTempMin(currentAppliedRange.min)
    setTempMax(currentAppliedRange.max)
  }, [currentAppliedRange])

  const rangeErrorMessage = getRangeErrorMessage(tempMin, tempMax, isData ? '데이터' : '금액')
  const isRangeError = !!rangeErrorMessage

  const handlePresetSelect = (index: number) => {
    const selected = options[index]
    const newRange = {
      min: (isData ? selected.minDataAmount : selected.minPrice)?.toString() || '',
      max: (isData ? selected.maxDataAmount : selected.maxPrice)?.toString() || '',
    }

    onFilterChange({
      [isData ? 'selectedDataRange' : 'selectedPriceRange']: index,
      [isData ? 'appliedDataRange' : 'appliedPriceRange']: newRange,
    })
    setTempMin(newRange.min)
    setTempMax(newRange.max)
  }

  const handleCustomChange = (value: string, type: 'min' | 'max') => {
    if (type === 'min') {
      setTempMin(value)
    } else {
      setTempMax(value)
    }
    onFilterChange({ [isData ? 'selectedDataRange' : 'selectedPriceRange']: null })
  }

  const handleApplyClick = () => {
    onFilterChange({
      [isData ? 'appliedDataRange' : 'appliedPriceRange']: { min: tempMin, max: tempMax },
    })
    onApply()
  }

  const handleResetClick = () => {
    setTempMin('')
    setTempMax('')
    onFilterChange({
      [isData ? 'selectedDataRange' : 'selectedPriceRange']: null,
      [isData ? 'appliedDataRange' : 'appliedPriceRange']: { min: '', max: '' },
    })
    onReset()
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
        {options.map((option, index) => {
          const checked = selectedRangeIndex === index

          return (
            <div
              key={option.label}
              className="flex items-center gap-3"
              onClick={() => handlePresetSelect(index)}
            >
              <CheckBox checked={checked} onChange={() => {}} type="default" />
              <span className="text-fs16">{option.label}</span>
            </div>
          )
        })}
        <div className="mt-2 px-1">
          <RangeInput
            idPrefix={`${rangeType}`}
            type={rangeType}
            placeholderMin={`최소 ${isData ? '데이터' : '금액'}`}
            placeholderMax={`최대 ${isData ? '데이터' : '금액'}`}
            minValue={tempMin}
            maxValue={tempMax}
            error={isRangeError}
            onChangeMin={val => handleCustomChange(val, 'min')}
            onChangeMax={val => handleCustomChange(val, 'max')}
          />
        </div>
        {isRangeError && <p className="text-error text-fs12 mt-1">{rangeErrorMessage}</p>}
      </div>
      <div className={`${isData ? 'mt-10' : 'mt-5'} flex w-full gap-3`}>
        <Button
          text="초기화"
          className="text-fs18 bg-gray-50 px-6.75 py-5 font-medium text-gray-800"
          onClick={handleResetClick}
        />
        <Button
          text="적용하기"
          className="text-fs18 text-gray-10 bg-pri-500 w-full p-5 font-medium"
          onClick={handleApplyClick}
          disabled={isRangeError}
        />
      </div>
    </div>
  )
}

export default MobileRangeSelectContent
