import DropDown from '../../../components/DropDown/DropDown'
import CheckBox from '../../../components/CheckBox/CheckBox'
import FilterIcon from '@/assets/icons/filter.svg?react'
import Button from '../../../components/Button/Button'
import { getRangeErrorMessage } from '../../../utils/validation'
import RangeInput from './RangeInput'
import {
  TELECOMCOMPANY_OPTIONS,
  SALES_TYPE_OPTIONS,
  STATUS_OPTIONS,
  SALES_DATA_AMOUNT_OPTIONS,
  PRICE_OPTIONS,
} from '../../../constants/filterOptions'
import { Statuses } from '../../../apis/transactionFeed'
import { useState } from 'react'

type RangeValue = { min: string; max: string }

export type FilterState = {
  telecomCompanyIds: (string | number)[]
  salesTypeIds: (string | number)[]
  statuses: Statuses[]
  selectedDataRange: number | null
  selectedPriceRange: number | null
  appliedDataRange: RangeValue
  appliedPriceRange: RangeValue
}

interface FilterBarProps {
  filterState: FilterState
  onFilterChange: (updated: Partial<FilterState>) => void
  onReset: () => void
}

const FilterBar = ({ filterState, onFilterChange, onReset }: FilterBarProps) => {
  const [tempCustomDataRange, setTempCustomDataRange] = useState<RangeValue>(
    filterState.appliedDataRange
  )
  const [tempCustomPriceRange, setTempCustomPriceRange] = useState<RangeValue>(
    filterState.appliedPriceRange
  )

  const getColorClass = (label: string) => {
    if (label === 'SKT') return 'text-skt'
    if (label === 'KT') return 'text-kt'
    if (label === 'LG U+') return 'text-lguplus'
    return 'text-gray-800'
  }

  const dataRangeErrorMessage = getRangeErrorMessage(
    tempCustomDataRange.min,
    tempCustomDataRange.max,
    '데이터'
  )
  const priceRangeErrorMessage = getRangeErrorMessage(
    tempCustomPriceRange.min,
    tempCustomPriceRange.max,
    '금액'
  )

  const isDataRangeError = !!dataRangeErrorMessage
  const isPriceRangeError = !!priceRangeErrorMessage

  const handleSelectDataRange = (index: number) => {
    const selected = SALES_DATA_AMOUNT_OPTIONS[index]
    const newAppliedRange = {
      min: selected.minDataAmount.toString(),
      max: selected.maxDataAmount.toString(),
    }
    onFilterChange({
      selectedDataRange: index,
      appliedDataRange: newAppliedRange,
    })
    setTempCustomDataRange(newAppliedRange)
  }

  const handleSelectPriceRange = (index: number) => {
    const selected = PRICE_OPTIONS[index]
    const newAppliedRange = {
      min: selected.minPrice.toString(),
      max: selected.maxPrice.toString(),
    }
    onFilterChange({
      selectedPriceRange: index,
      appliedPriceRange: newAppliedRange,
    })
    setTempCustomPriceRange(newAppliedRange)
  }

  const renderFilterSectionMulti = <T,>(
    title: string,
    options: { id?: T; value?: T; label: string }[],
    selected: T[],
    key: keyof FilterState,
    getClass: (label: string) => string = () => 'text-gray-800',
    showDivider = true,
    defaultOpen = true
  ) => (
    <>
      <DropDown
        type="filter"
        placeholder={title}
        selected=""
        onSelect={() => {}}
        className="w-full"
        paddingClassName="p-2"
        defaultOpen={defaultOpen}
      >
        <div className="flex flex-col">
          {options.map((option, index) => {
            const value = (option.id ?? option.value ?? index) as T
            const checked = selected.includes(value)
            const handleClick = () => {
              const newList = checked
                ? selected.filter(item => item !== value)
                : [...selected, value]

              onFilterChange({ [key]: newList } as Partial<FilterState>)
            }

            return (
              <div
                key={option.label}
                className="flex cursor-pointer items-center gap-2 p-2"
                onClick={handleClick}
              >
                <CheckBox checked={checked} onChange={() => {}} />
                <span className={getClass(option.label)}>{option.label}</span>
              </div>
            )
          })}
        </div>
      </DropDown>
      {showDivider && <div className="my-0.5 h-[0.5px] w-full bg-gray-200" />}
    </>
  )

  const renderFilterSectionSingle = (
    title: string,
    options: { value: number; label: string }[],
    selected: number | null,
    setSelected: (value: number) => void,
    getClass: (label: string) => string = () => 'text-gray-800',
    showDivider = true,
    renderRangeInput?: React.ReactNode
  ) => (
    <>
      <DropDown
        type="filter"
        placeholder={title}
        selected=""
        onSelect={() => {}}
        className="w-full"
        paddingClassName="p-2"
      >
        <div className="flex flex-col">
          {options.map(option => {
            const checked = selected === option.value
            const handleClick = () => setSelected(option.value)
            return (
              <div
                key={option.label}
                className="flex cursor-pointer items-center gap-2 p-2"
                onClick={handleClick}
              >
                <CheckBox checked={checked} type="radio" onChange={() => {}} />
                <span className={getClass(option.label)}>{option.label}</span>
              </div>
            )
          })}
          <div className="p-2">{renderRangeInput}</div>
        </div>
      </DropDown>
      {showDivider && <div className="my-0.5 h-[0.5px] w-full bg-gray-200" />}
    </>
  )

  return (
    <div
      className="h-[calc(100vh-10rem)] overflow-y-auto rounded-lg"
      style={{ scrollbarGutter: 'stable' }}
    >
      <div className="bg-gray-10 effect-side-filter flex w-65 flex-col gap-0.5 rounded-lg p-2 lg:w-71.75">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-1">
            <h2 className="text-fs20 font-semibold text-gray-800">필터</h2>
            <FilterIcon className="h-5 w-5" />
          </div>
          <Button
            text="초기화"
            shape="underline"
            className="text-fs14 text-gray-700"
            onClick={() => {
              onReset()
              setTempCustomDataRange({ min: '', max: '' })
              setTempCustomPriceRange({ min: '', max: '' })
            }}
          />
        </div>

        {renderFilterSectionMulti(
          '통신사',
          TELECOMCOMPANY_OPTIONS,
          filterState.telecomCompanyIds,
          'telecomCompanyIds',
          getColorClass
        )}

        {renderFilterSectionMulti(
          '판매글 유형',
          SALES_TYPE_OPTIONS,
          filterState.salesTypeIds,
          'salesTypeIds'
        )}

        {renderFilterSectionMulti(
          '거래 상태',
          STATUS_OPTIONS.map(opt => ({ value: opt.value, label: opt.label })),
          filterState.statuses,
          'statuses'
        )}

        {renderFilterSectionSingle(
          '데이터',
          SALES_DATA_AMOUNT_OPTIONS.map((opt, i) => ({ value: i, label: opt.label })),
          filterState.selectedDataRange,
          handleSelectDataRange,
          undefined,
          true,
          <RangeInput
            idPrefix="data"
            type="dataAmount"
            minValue={tempCustomDataRange.min}
            maxValue={tempCustomDataRange.max}
            error={isDataRangeError}
            errorMessage={dataRangeErrorMessage}
            selectedMin={
              filterState.selectedDataRange !== null
                ? SALES_DATA_AMOUNT_OPTIONS[filterState.selectedDataRange].minDataAmount.toString()
                : undefined
            }
            selectedMax={
              filterState.selectedDataRange !== null
                ? SALES_DATA_AMOUNT_OPTIONS[filterState.selectedDataRange].maxDataAmount.toString()
                : undefined
            }
            onResetSelected={() => {
              onFilterChange({ selectedDataRange: null, appliedDataRange: { min: '', max: '' } })
              setTempCustomDataRange({ min: '', max: '' })
            }}
            onApply={() => {
              const matchedIndex = SALES_DATA_AMOUNT_OPTIONS.findIndex(
                option =>
                  option.minDataAmount.toString() === tempCustomDataRange.min &&
                  option.maxDataAmount.toString() === tempCustomDataRange.max
              )
              onFilterChange({
                selectedDataRange: matchedIndex !== -1 ? matchedIndex : null,
                appliedDataRange: tempCustomDataRange,
              })
            }}
            onChangeMin={val => {
              setTempCustomDataRange(prev => ({ ...prev, min: val }))
            }}
            onChangeMax={val => {
              setTempCustomDataRange(prev => ({ ...prev, max: val }))
            }}
          />
        )}

        {renderFilterSectionSingle(
          '가격',
          PRICE_OPTIONS.map((opt, i) => ({ value: i, label: opt.label })),
          filterState.selectedPriceRange,
          handleSelectPriceRange,
          undefined,
          false,
          <RangeInput
            idPrefix="price"
            type="price"
            minValue={tempCustomPriceRange.min}
            maxValue={tempCustomPriceRange.max}
            error={isPriceRangeError}
            errorMessage={priceRangeErrorMessage}
            selectedMin={
              filterState.selectedPriceRange !== null
                ? PRICE_OPTIONS[filterState.selectedPriceRange].minPrice.toString()
                : undefined
            }
            selectedMax={
              filterState.selectedPriceRange !== null
                ? PRICE_OPTIONS[filterState.selectedPriceRange].maxPrice.toString()
                : undefined
            }
            onResetSelected={() => {
              onFilterChange({
                selectedPriceRange: null,
                appliedPriceRange: { min: '', max: '' },
              })
              setTempCustomPriceRange({ min: '', max: '' })
            }}
            onApply={() => {
              const matchedIndex = PRICE_OPTIONS.findIndex(
                option =>
                  option.minPrice.toString() === tempCustomPriceRange.min &&
                  option.maxPrice.toString() === tempCustomPriceRange.max
              )
              onFilterChange({
                selectedPriceRange: matchedIndex !== -1 ? matchedIndex : null,
                appliedPriceRange: tempCustomPriceRange,
              })
            }}
            onChangeMin={val => {
              setTempCustomPriceRange(prev => ({ ...prev, min: val }))
            }}
            onChangeMax={val => {
              setTempCustomPriceRange(prev => ({ ...prev, max: val }))
            }}
          />
        )}
      </div>
    </div>
  )
}

export default FilterBar
