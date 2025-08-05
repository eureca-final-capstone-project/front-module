import { useState, useEffect } from 'react'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import ResetIcon from '@/assets/icons/reset.svg?react'
import MobileSortContent from './MobileSortContent'
import MobileSingleSelectContent from './MobileSingleSelectContent'
import { MyMobileFilterState } from '../../../types/filter'
import { MyPageSortLabel } from '../../../constants/sortBy'
import { MY_FILTER_OPTIONS, MY_STATUS_OPTIONS } from '../../../constants/filterOptions'
import MobileFilterButton from '../../../pages/PostPage/components/MobileFilterButton'

type FilterType = 'sort' | 'filter' | 'status'

interface MobileFilterProps {
  isOpen: boolean
  onClose: () => void
  onResetAllFilters: () => void
  appliedFilterState: MyMobileFilterState
  onApplyFilter: (newState: MyMobileFilterState) => void
}

const MobileFilter = ({
  isOpen,
  onClose,
  onResetAllFilters,
  appliedFilterState,
  onApplyFilter,
}: MobileFilterProps) => {
  const [tempFilterState, setTempFilterState] = useState<MyMobileFilterState>(appliedFilterState)
  const [selectedFilterType, setSelectedFilterType] = useState<FilterType | null>(null)

  const isDefaultState =
    tempFilterState.sort === '최신순' &&
    tempFilterState.filter === 'ALL' &&
    tempFilterState.status === 'ALL'

  useEffect(() => {
    setTempFilterState(appliedFilterState)
  }, [appliedFilterState])

  const handleSelect = (type: FilterType, value: string) => {
    const updatedState: MyMobileFilterState = {
      ...tempFilterState,
      [type]: value,
    }
    setTempFilterState(updatedState)
    onApplyFilter(updatedState)
    setSelectedFilterType(null)
    onClose()
  }

  const getBottomSheetTitle = () => {
    switch (selectedFilterType) {
      case 'sort':
        return '정렬'
      case 'filter':
        return '판매글 유형'
      case 'status':
        return '거래 상태'
      default:
        return ''
    }
  }

  const renderBottomSheetContent = () => {
    switch (selectedFilterType) {
      case 'sort':
        return (
          <MobileSortContent
            currentSort={tempFilterState.sort}
            onSelectSort={(value: MyPageSortLabel) => handleSelect('sort', value)}
          />
        )
      case 'filter':
        return (
          <MobileSingleSelectContent
            options={MY_FILTER_OPTIONS}
            selectedValue={tempFilterState.filter}
            onSelect={value => handleSelect('filter', value)}
          />
        )
      case 'status':
        return (
          <MobileSingleSelectContent
            options={MY_STATUS_OPTIONS}
            selectedValue={tempFilterState.status}
            onSelect={value => handleSelect('status', value)}
          />
        )
      default:
        return null
    }
  }

  const getButtonProps = (type: FilterType) => {
    let label = ''
    let isApplied = false

    switch (type) {
      case 'sort':
        label = tempFilterState.sort
        isApplied = tempFilterState.sort !== '최신순'
        break
      case 'filter':
        label = MY_FILTER_OPTIONS.find(opt => opt.value === tempFilterState.filter)?.label ?? ''
        isApplied = tempFilterState.filter !== 'ALL'
        break
      case 'status':
        label = MY_STATUS_OPTIONS.find(opt => opt.value === tempFilterState.status)?.label ?? ''
        isApplied = tempFilterState.status !== 'ALL'
        break
    }

    return { isApplied, appliedValue: label }
  }

  return (
    <div className="scrollbar-hide overflow-x-auto px-4 pb-2 whitespace-nowrap">
      <div className="inline-flex gap-2">
        {!isDefaultState && (
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
          onClick={() => setSelectedFilterType('sort')}
          {...getButtonProps('sort')}
        />
        <MobileFilterButton
          title="판매글 유형"
          onClick={() => setSelectedFilterType('filter')}
          {...getButtonProps('filter')}
        />
        <MobileFilterButton
          title="거래 상태"
          onClick={() => setSelectedFilterType('status')}
          {...getButtonProps('status')}
        />
      </div>

      <BottomSheet
        isOpen={isOpen && selectedFilterType !== null}
        onClose={() => {
          setSelectedFilterType(null)
          onClose()
        }}
        title={getBottomSheetTitle()}
      >
        {renderBottomSheetContent()}
      </BottomSheet>
    </div>
  )
}

export default MobileFilter
