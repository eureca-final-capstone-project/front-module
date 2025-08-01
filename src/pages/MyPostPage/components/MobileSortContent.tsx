import CheckBox from '../../../components/CheckBox/CheckBox'
import { MYPAGE_SORT, MyPageSortLabel } from '../../../constants/sortBy'

interface MobileSortContentProps {
  currentSort: MyPageSortLabel
  onSelectSort: (sort: MyPageSortLabel) => void
}

const MobileSortContent = ({ currentSort, onSelectSort }: MobileSortContentProps) => {
  const handleSortOptionClick = (sortOption: { label: MyPageSortLabel; value: string }) => {
    onSelectSort(sortOption.label)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-10 flex flex-1 flex-col gap-4 overflow-y-auto">
        {MYPAGE_SORT.map(sortOption => (
          <div
            key={sortOption.label}
            className="flex cursor-pointer items-center justify-between"
            onClick={() => handleSortOptionClick(sortOption)}
          >
            <span
              className={`text-fs16 cursor-pointer ${currentSort === sortOption.label ? 'text-pri-500 font-semibold' : 'text-gray-900'}`}
            >
              {sortOption.label}
            </span>
            <CheckBox
              checked={currentSort === sortOption.label}
              onChange={() => onSelectSort(sortOption.label)}
              type="check"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobileSortContent
