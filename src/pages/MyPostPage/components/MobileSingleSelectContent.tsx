import CheckBox from '../../../components/CheckBox/CheckBox'

interface Option {
  value: string
  label: string
}

interface MobileSingleSelectContentProps {
  options: Option[]
  selectedValue: string
  onSelect: (value: string) => void
  getColorClass?: (label: string) => string
}

const MobileSingleSelectContent = ({
  options,
  selectedValue,
  onSelect,
  getColorClass = () => 'text-gray-900',
}: MobileSingleSelectContentProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-10 flex flex-1 flex-col gap-4 overflow-y-auto">
        {options.map(option => {
          const value = option.value
          const checked = selectedValue === value

          return (
            <div
              key={option.label}
              className="flex cursor-pointer items-center gap-3"
              onClick={() => onSelect(value)}
            >
              <CheckBox checked={checked} onChange={() => {}} type="radio" />
              <span className={`text-fs16 ${getColorClass(option.label)}`}>{option.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MobileSingleSelectContent
