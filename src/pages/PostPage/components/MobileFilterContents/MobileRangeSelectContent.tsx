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

  const areInputsFilled = useMemo(() => {
    if (selectedRangeIndex !== null) {
      return true
    }
    return tempMin.trim() !== '' && tempMax.trim() !== ''
  }, [tempMin, tempMax, selectedRangeIndex])

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
    const newMin = type === 'min' ? value : tempMin
    const newMax = type === 'max' ? value : tempMax

    setTempMin(newMin)
    setTempMax(newMax)

    onFilterChange({
      [isData ? 'selectedDataRange' : 'selectedPriceRange']: null, // 사용자 직접 입력 시 프리셋 선택 해제
      [isData ? 'appliedDataRange' : 'appliedPriceRange']: { min: newMin, max: newMax },
    })
  }

  const handleApplyClick = () => {
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
              className="flex cursor-pointer items-center gap-3"
              onClick={() => handlePresetSelect(index)}
            >
              <CheckBox checked={checked} onChange={() => {}} type="radio" />
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
            onApply={handleApplyClick}
          />
        </div>
        {isRangeError && <p className="text-error text-fs12 px-2">{rangeErrorMessage}</p>}
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
          disabled={isRangeError || !areInputsFilled}
        />
      </div>
    </div>
  )
}

export default MobileRangeSelectContent
