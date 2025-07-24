import { useEffect, useState } from 'react'
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

type RangeValue = { min: string; max: string }

type FilterState = {
  telecomCompanyIds: number[]
  salesTypeIds: number[]
  statuses: string[]
  selectedDataRange: number | null
  selectedPriceRange: number | null
  customDataRange: RangeValue
  customPriceRange: RangeValue
  appliedDataRange: RangeValue
  appliedPriceRange: RangeValue
}

const initialFilterState: FilterState = {
  telecomCompanyIds: [],
  salesTypeIds: [],
  statuses: [],
  selectedDataRange: null,
  selectedPriceRange: null,
  customDataRange: { min: '', max: '' },
  customPriceRange: { min: '', max: '' },
  appliedDataRange: { min: '', max: '' },
  appliedPriceRange: { min: '', max: '' },
}

const FilterBar = () => {
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState)

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K] | ((prev: FilterState[K]) => FilterState[K])
  ) => {
    setFilterState(prev => ({
      ...prev,
      [key]:
        typeof value === 'function'
          ? (value as (v: FilterState[K]) => FilterState[K])(prev[key])
          : value,
    }))
  }

  const resetFilters = () => {
    setFilterState(initialFilterState)
    console.log('🔄 필터 초기화됨')
  }

  const getColorClass = (label: string) => {
    if (label === 'SKT') return 'text-skt'
    if (label === 'KT') return 'text-kt'
    if (label === 'LG U+') return 'text-lguplus'
    return 'text-gray-800'
  }

  const dataRangeErrorMessage = getRangeErrorMessage(
    filterState.customDataRange.min,
    filterState.customDataRange.max,
    '데이터'
  )
  const priceRangeErrorMessage = getRangeErrorMessage(
    filterState.customPriceRange.min,
    filterState.customPriceRange.max,
    '금액'
  )

  const isDataRangeError = !!dataRangeErrorMessage
  const isPriceRangeError = !!priceRangeErrorMessage

  const handleSelectDataRange = (index: number) => {
    const selected = SALES_DATA_AMOUNT_OPTIONS[index]
    updateFilter('selectedDataRange', index)
    updateFilter('customDataRange', {
      min: selected.minDataAmount.toString(),
      max: selected.maxDataAmount.toString(),
    })
  }

  const handleSelectPriceRange = (index: number) => {
    const selected = PRICE_OPTIONS[index]
    updateFilter('selectedPriceRange', index)
    updateFilter('customPriceRange', {
      min: selected.minPrice.toString(),
      max: selected.maxPrice.toString(),
    })
  }

  // 🔹 4. 쿼리 생성 로직
  useEffect(() => {
    const selectedData =
      filterState.selectedDataRange !== null
        ? SALES_DATA_AMOUNT_OPTIONS[filterState.selectedDataRange]
        : null
    const selectedPrice =
      filterState.selectedPriceRange !== null ? PRICE_OPTIONS[filterState.selectedPriceRange] : null

    const query = {
      telecomCompanyIds: filterState.telecomCompanyIds,
      salesTypeIds: filterState.salesTypeIds,
      statuses: filterState.statuses,
      minDataAmount: selectedData
        ? selectedData.minDataAmount
        : Number(filterState.appliedDataRange.min) || null,
      maxDataAmount: selectedData
        ? selectedData.maxDataAmount
        : Number(filterState.appliedDataRange.max) || null,
      minPrice: selectedPrice
        ? selectedPrice.minPrice
        : Number(filterState.appliedPriceRange.min) || null,
      maxPrice: selectedPrice
        ? selectedPrice.maxPrice
        : Number(filterState.appliedPriceRange.max) || null,
    }

    console.log('최종 선택값:', query)
  }, [filterState])

  const renderFilterSectionMulti = <T,>(
    title: string,
    options: { id?: T; value?: T; label: string }[],
    selected: T[],
    setSelected: (list: T[]) => void,
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
              setSelected(newList)
            }

            return (
              <div key={option.label} className="flex items-center gap-2 p-2">
                <CheckBox checked={checked} onChange={handleClick} />
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
              <div key={option.label} className="flex items-center gap-2 p-2">
                <CheckBox checked={checked} onChange={handleClick} />
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
      className="h-[calc(100vh-10rem)] overflow-y-auto"
      style={{ scrollbarGutter: 'stable both-edges' }}
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
            onClick={resetFilters}
          />
        </div>

        {renderFilterSectionMulti(
          '통신사',
          TELECOMCOMPANY_OPTIONS,
          filterState.telecomCompanyIds,
          list => updateFilter('telecomCompanyIds', list),
          getColorClass
        )}

        {renderFilterSectionMulti(
          '판매글 유형',
          SALES_TYPE_OPTIONS,
          filterState.salesTypeIds,
          list => updateFilter('salesTypeIds', list)
        )}

        {renderFilterSectionMulti(
          '거래 상태',
          STATUS_OPTIONS.map(opt => ({ value: opt.value, label: opt.label })),
          filterState.statuses,
          list => updateFilter('statuses', list)
        )}

        {renderFilterSectionSingle(
          '데이터',
          SALES_DATA_AMOUNT_OPTIONS.map((opt, i) => ({ value: i, label: opt.label })),
          filterState.selectedDataRange,
          val => handleSelectDataRange(val),
          undefined,
          true,
          <RangeInput
            idPrefix="data"
            type="dataAmount"
            minValue={filterState.customDataRange.min}
            maxValue={filterState.customDataRange.max}
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
            onResetSelected={() => updateFilter('selectedDataRange', null)}
            onApply={() => {
              const matchedIndex = SALES_DATA_AMOUNT_OPTIONS.findIndex(
                option =>
                  option.minDataAmount.toString() === filterState.customDataRange.min &&
                  option.maxDataAmount.toString() === filterState.customDataRange.max
              )
              if (matchedIndex !== -1) {
                updateFilter('selectedDataRange', matchedIndex)
              } else {
                updateFilter('selectedDataRange', null)
                updateFilter('appliedDataRange', filterState.customDataRange)
              }
              console.log('데이터 범위 적용:', filterState.customDataRange)
            }}
            onChangeMin={val => {
              const selected =
                filterState.selectedDataRange !== null
                  ? SALES_DATA_AMOUNT_OPTIONS[filterState.selectedDataRange]
                  : null
              updateFilter('customDataRange', prev => {
                if (
                  selected &&
                  (selected.minDataAmount.toString() !== val ||
                    selected.maxDataAmount.toString() !== prev.max)
                ) {
                  updateFilter('selectedDataRange', null)
                }
                return { ...prev, min: val }
              })
            }}
            onChangeMax={val => {
              const selected =
                filterState.selectedDataRange !== null
                  ? SALES_DATA_AMOUNT_OPTIONS[filterState.selectedDataRange]
                  : null
              updateFilter('customDataRange', prev => {
                if (
                  selected &&
                  (selected.maxDataAmount.toString() !== val ||
                    selected.minDataAmount.toString() !== prev.min)
                ) {
                  updateFilter('selectedDataRange', null)
                }
                return { ...prev, max: val }
              })
            }}
          />
        )}

        {renderFilterSectionSingle(
          '가격',
          PRICE_OPTIONS.map((opt, i) => ({ value: i, label: opt.label })),
          filterState.selectedPriceRange,
          val => handleSelectPriceRange(val),
          undefined,
          false,
          <RangeInput
            idPrefix="price"
            type="price"
            minValue={filterState.customPriceRange.min}
            maxValue={filterState.customPriceRange.max}
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
            onResetSelected={() => updateFilter('selectedPriceRange', null)}
            onApply={() => {
              const matchedIndex = PRICE_OPTIONS.findIndex(
                option =>
                  option.minPrice.toString() === filterState.customPriceRange.min &&
                  option.maxPrice.toString() === filterState.customPriceRange.max
              )
              if (matchedIndex !== -1) {
                updateFilter('selectedPriceRange', matchedIndex)
              } else {
                updateFilter('selectedPriceRange', null)
                updateFilter('appliedPriceRange', filterState.customPriceRange)
              }
              console.log('가격 범위 적용:', filterState.customPriceRange)
            }}
            onChangeMin={val => {
              const selected =
                filterState.selectedPriceRange !== null
                  ? PRICE_OPTIONS[filterState.selectedPriceRange]
                  : null
              updateFilter('customPriceRange', prev => {
                if (
                  selected &&
                  (selected.minPrice.toString() !== val ||
                    selected.maxPrice.toString() !== prev.max)
                ) {
                  updateFilter('selectedPriceRange', null)
                }
                return { ...prev, min: val }
              })
            }}
            onChangeMax={val => {
              const selected =
                filterState.selectedPriceRange !== null
                  ? PRICE_OPTIONS[filterState.selectedPriceRange]
                  : null
              updateFilter('customPriceRange', prev => {
                if (
                  selected &&
                  (selected.maxPrice.toString() !== val ||
                    selected.minPrice.toString() !== prev.min)
                ) {
                  updateFilter('selectedPriceRange', null)
                }
                return { ...prev, max: val }
              })
            }}
          />
        )}
      </div>
    </div>
  )
}

export default FilterBar
