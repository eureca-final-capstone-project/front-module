import DropDown from '../../../components/DropDown/DropDown'
import CheckBox from '../../../components/CheckBox/CheckBox'
import FilterIcon from '@/assets/icons/filter.svg?react'
import Button from '../../../components/Button/Button'
import { MY_FILTER_OPTIONS, MY_STATUS_OPTIONS } from '../../../constants/filterOptions'
import type { FilterType, StatusType } from '../../../apis/transactionFeed'

export type FilterState = {
  filter: FilterType
  status: StatusType
}

interface FilterBarProps {
  filterState: FilterState
  onFilterChange: (updated: Partial<FilterState>) => void
  onReset: () => void
}

const FilterBar = ({ filterState, onFilterChange, onReset }: FilterBarProps) => {
  const renderFilterSectionSingle = (
    title: string,
    options: { value: string; label: string }[],
    selected: string,
    field: keyof FilterState,
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
          {options.map(option => {
            const checked = selected === option.value
            const handleClick = () => {
              onFilterChange({
                [field]: option.value as FilterState[keyof FilterState],
              })
            }

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
        </div>
      </DropDown>
      {showDivider && <div className="my-0.5 h-[0.5px] w-full bg-gray-200" />}
    </>
  )

  return (
    <div className="rounded-lg">
      <div className="bg-gray-10 effect-side-filter flex w-50 flex-col gap-0.5 rounded-lg p-2 lg:w-71.75">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-1">
            <h2 className="text-fs20 font-semibold text-gray-800">필터</h2>
            <FilterIcon className="h-5 w-5" />
          </div>
          <Button
            text="초기화"
            shape="underline"
            className="text-fs14 text-gray-700"
            onClick={onReset}
          />
        </div>

        {renderFilterSectionSingle('판매글 유형', MY_FILTER_OPTIONS, filterState.filter, 'filter')}

        {renderFilterSectionSingle(
          '거래 상태',
          MY_STATUS_OPTIONS,
          filterState.status,
          'status',
          undefined,
          false
        )}
      </div>
    </div>
  )
}

export default FilterBar
