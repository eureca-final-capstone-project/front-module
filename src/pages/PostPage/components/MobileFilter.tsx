import { useState, useEffect } from 'react'
import ResetIcon from '@/assets/icons/reset.svg?react'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import MobileSortContent from './MobileFilterContents/MobileSortContent'
import MobileMultiSelectContent from './MobileFilterContents/MobileMultiSelectContent'
import MobileRangeSelectContent from './MobileFilterContents/MobileRangeSelectContent'
import { MobileFilterState, initialFilterState } from '../../../types/filter'
import {
  TELECOMCOMPANY_OPTIONS,
  SALES_TYPE_OPTIONS,
  STATUS_OPTIONS,
  SALES_DATA_AMOUNT_OPTIONS,
  PRICE_OPTIONS,
} from '../../../constants/filterOptions'
import MobileFilterButton from './MobileFilterButton'
import { Statuses } from '../../../apis/transactionFeed'
import { RangeOption } from './MobileFilterContents/MobileRangeSelectContent'
import { SortLabel } from '../../../constants/sortBy'

type FilterType =
  | 'sort'
  | 'salesTypeIds'
  | 'telecomCompanyIds'
  | 'statuses'
  | 'dataAmount'
  | 'price'

interface MobileFilterProps {
  isOpen: boolean
  onClose: () => void
  appliedFilterState: MobileFilterState
  onApplyFilter: (newFilterState: MobileFilterState) => void
  onResetAllFilters: () => void
  keyword: string
}

const MobileFilter = ({
  isOpen,
  onClose,
  appliedFilterState,
  onApplyFilter,
  onResetAllFilters,
  keyword,
}: MobileFilterProps) => {
  const [tempFilterState, setTempFilterState] = useState<MobileFilterState>(appliedFilterState)
  const [selectedFilterType, setSelectedFilterType] = useState<FilterType | null>(null)

  const getColorClass = (label: string) => {
    if (label === 'SKT') return 'text-skt'
    if (label === 'KT') return 'text-kt'
    if (label === 'LG U+') return 'text-lguplus'
    return 'text-gray-800'
  }

  useEffect(() => {
    setTempFilterState(appliedFilterState)
  }, [appliedFilterState])

  const handleFilterSectionClick = (type: FilterType) => {
    setSelectedFilterType(type)
  }

  const handleBottomSheetClose = () => {
    setSelectedFilterType(null)
    setTempFilterState(appliedFilterState)
    onClose()
  }

  const handleTempFilterChange = (updated: Partial<MobileFilterState>) => {
    setTempFilterState(prev => ({ ...prev, ...updated }))
  }

  const handleApply = () => {
    onApplyFilter(tempFilterState)
    setSelectedFilterType(null)
    onClose()
  }

  const hasAnyFilterApplied = () => {
    return (
      tempFilterState.sort !== initialFilterState.sort ||
      tempFilterState.salesTypeIds.length > 0 ||
      tempFilterState.telecomCompanyIds.length > 0 ||
      tempFilterState.statuses.length > 0 ||
      tempFilterState.appliedDataRange.min !== '' ||
      tempFilterState.appliedDataRange.max !== '' ||
      tempFilterState.appliedPriceRange.min !== '' ||
      tempFilterState.appliedPriceRange.max !== '' ||
      keyword !== ''
    )
  }

  const handleReset = () => {
    let resetPartialState: Partial<MobileFilterState> = {}
    switch (selectedFilterType) {
      case 'sort':
        resetPartialState = { sort: initialFilterState.sort }
        break
      case 'salesTypeIds':
        resetPartialState = { salesTypeIds: initialFilterState.salesTypeIds }
        break
      case 'telecomCompanyIds':
        resetPartialState = {
          telecomCompanyIds: initialFilterState.telecomCompanyIds,
        }
        break
      case 'statuses':
        resetPartialState = { statuses: initialFilterState.statuses }
        break
      case 'dataAmount':
        resetPartialState = {
          selectedDataRange: initialFilterState.selectedDataRange,
          appliedDataRange: initialFilterState.appliedDataRange,
        }
        break
      case 'price':
        resetPartialState = {
          selectedPriceRange: initialFilterState.selectedPriceRange,
          appliedPriceRange: initialFilterState.appliedPriceRange,
        }
        break
      default:
        break
    }
    setTempFilterState(prev => ({ ...prev, ...resetPartialState }))
    onApplyFilter({ ...tempFilterState, ...resetPartialState })
  }

  const getBottomSheetTitle = () => {
    switch (selectedFilterType) {
      case 'sort':
        return '정렬'
      case 'salesTypeIds':
        return '판매글 유형'
      case 'telecomCompanyIds':
        return '통신사'
      case 'statuses':
        return '거래 상태'
      case 'dataAmount':
        return '데이터'
      case 'price':
        return '가격'
      default:
        return '필터'
    }
  }

  const renderBottomSheetContent = () => {
    switch (selectedFilterType) {
      case 'sort':
        return (
          <MobileSortContent
            currentSort={tempFilterState.sort}
            onSelectSort={(sort: SortLabel) => {
              const newFilterState = { ...tempFilterState, sort: sort }
              onApplyFilter(newFilterState)
              setSelectedFilterType(null)
              onClose()
            }}
          />
        )
      case 'salesTypeIds':
        return (
          <MobileMultiSelectContent
            title="판매글 유형"
            options={SALES_TYPE_OPTIONS.map(opt => ({
              id: opt.id,
              label: opt.label,
              value: opt.id,
            }))}
            selectedOptions={tempFilterState.salesTypeIds}
            onSelectChange={updated => handleTempFilterChange({ salesTypeIds: updated })}
            onApply={handleApply}
            onReset={handleReset}
          />
        )
      case 'telecomCompanyIds':
        return (
          <MobileMultiSelectContent
            title="통신사"
            options={TELECOMCOMPANY_OPTIONS.map(opt => ({
              id: opt.id,
              label: opt.label,
              value: opt.id,
            }))}
            selectedOptions={tempFilterState.telecomCompanyIds}
            onSelectChange={updated => handleTempFilterChange({ telecomCompanyIds: updated })}
            onApply={handleApply}
            onReset={handleReset}
            getColorClass={getColorClass}
          />
        )
      case 'statuses':
        return (
          <MobileMultiSelectContent
            title="거래 상태"
            options={STATUS_OPTIONS}
            selectedOptions={tempFilterState.statuses}
            onSelectChange={(updated: (string | number)[]) =>
              handleTempFilterChange({ statuses: updated as Statuses[] })
            }
            onApply={handleApply}
            onReset={handleReset}
          />
        )
      case 'dataAmount': {
        const dataOptionsWithIndex: RangeOption[] = SALES_DATA_AMOUNT_OPTIONS.map((opt, index) => ({
          ...opt,
          value: index,
        }))
        return (
          <MobileRangeSelectContent
            title="데이터"
            options={dataOptionsWithIndex}
            filterState={tempFilterState}
            onFilterChange={handleTempFilterChange}
            onApply={handleApply}
            onReset={handleReset}
            rangeType="dataAmount"
          />
        )
      }
      case 'price': {
        const priceOptionsWithIndex: RangeOption[] = PRICE_OPTIONS.map((opt, index) => ({
          ...opt,
          value: index,
        }))
        return (
          <MobileRangeSelectContent
            title="가격"
            options={priceOptionsWithIndex}
            filterState={tempFilterState}
            onFilterChange={handleTempFilterChange}
            onApply={handleApply}
            onReset={handleReset}
            rangeType="price"
          />
        )
      }
      default:
        return null
    }
  }
  const getButtonProps = (type: FilterType) => {
    let isApplied = false
    let appliedValue: string | undefined

    switch (type) {
      case 'sort':
        isApplied = tempFilterState.sort !== initialFilterState.sort
        appliedValue = tempFilterState.sort
        break
      case 'salesTypeIds':
        isApplied = tempFilterState.salesTypeIds.length > 0
        appliedValue = isApplied ? `${tempFilterState.salesTypeIds.length}개` : undefined
        if (tempFilterState.salesTypeIds.length === 1) {
          const selectedOption = SALES_TYPE_OPTIONS.find(
            opt => opt.id === tempFilterState.salesTypeIds[0]
          )
          appliedValue = selectedOption?.label
        }
        break
      case 'telecomCompanyIds':
        isApplied = tempFilterState.telecomCompanyIds.length > 0
        appliedValue = isApplied ? `${tempFilterState.telecomCompanyIds.length}개` : undefined
        if (tempFilterState.telecomCompanyIds.length === 1) {
          const selectedOption = TELECOMCOMPANY_OPTIONS.find(
            opt => opt.id === tempFilterState.telecomCompanyIds[0]
          )
          appliedValue = selectedOption?.label
        }
        break
      case 'statuses':
        isApplied = tempFilterState.statuses.length > 0
        appliedValue = isApplied ? `${tempFilterState.statuses.length}개` : undefined
        if (tempFilterState.statuses.length === 1) {
          const selectedOption = STATUS_OPTIONS.find(
            opt => opt.value === tempFilterState.statuses[0]
          )
          appliedValue = selectedOption?.label
        }
        break
      case 'dataAmount':
        isApplied =
          tempFilterState.appliedDataRange.min !== '' || tempFilterState.appliedDataRange.max !== ''
        if (tempFilterState.selectedDataRange !== null) {
          const preset = SALES_DATA_AMOUNT_OPTIONS[tempFilterState.selectedDataRange]
          if (preset) {
            appliedValue = preset.label
          }
        } else if (isApplied) {
          const min = tempFilterState.appliedDataRange.min
          const max = tempFilterState.appliedDataRange.max
          if (min && max) appliedValue = `${min}MB ~ ${max}MB`
          else if (min) appliedValue = `${min}MB 이상`
          else if (max) appliedValue = `${max}MB 이하`
        }
        break
      case 'price':
        isApplied =
          tempFilterState.appliedPriceRange.min !== '' ||
          tempFilterState.appliedPriceRange.max !== ''
        if (tempFilterState.selectedPriceRange !== null) {
          const preset = PRICE_OPTIONS[tempFilterState.selectedPriceRange]
          if (preset) {
            appliedValue = preset.label
          }
        } else if (isApplied) {
          const min = tempFilterState.appliedPriceRange.min
          const max = tempFilterState.appliedPriceRange.max
          if (min && max) appliedValue = `${min}원 ~ ${max}원`
          else if (min) appliedValue = `${min}원 이상`
          else if (max) appliedValue = `${max}원 이하`
        }
        break
      default:
        break
    }
    return { isApplied, appliedValue }
  }

  return (
    <div className="overflow-x-auto px-4 pb-2 whitespace-nowrap">
      <div className="inline-flex gap-2">
        {hasAnyFilterApplied() && (
          <div
            className="bg-gray-10 text-fs14 flex items-center justify-center gap-1 rounded-full border-[0.5px] border-gray-200 px-2.5 text-gray-900"
            onClick={onResetAllFilters}
          >
            초기화
            <ResetIcon className="h-4 w-4" />
          </div>
        )}
        <MobileFilterButton
          title="최신순"
          onClick={() => handleFilterSectionClick('sort')}
          {...getButtonProps('sort')}
        />
        <MobileFilterButton
          title="판매글 유형"
          onClick={() => handleFilterSectionClick('salesTypeIds')}
          {...getButtonProps('salesTypeIds')}
        />
        <MobileFilterButton
          title="통신사"
          onClick={() => handleFilterSectionClick('telecomCompanyIds')}
          {...getButtonProps('telecomCompanyIds')}
        />
        <MobileFilterButton
          title="거래 상태"
          onClick={() => handleFilterSectionClick('statuses')}
          {...getButtonProps('statuses')}
        />

        <MobileFilterButton
          title="데이터"
          onClick={() => handleFilterSectionClick('dataAmount')}
          {...getButtonProps('dataAmount')}
        />
        <MobileFilterButton
          title="가격"
          onClick={() => handleFilterSectionClick('price')}
          {...getButtonProps('price')}
        />
      </div>

      <BottomSheet
        isOpen={isOpen && selectedFilterType !== null}
        onClose={handleBottomSheetClose}
        title={getBottomSheetTitle()}
      >
        {renderBottomSheetContent()}
      </BottomSheet>
    </div>
  )
}

export default MobileFilter
