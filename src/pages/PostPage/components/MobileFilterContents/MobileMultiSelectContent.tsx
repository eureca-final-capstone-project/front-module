import CheckBox from '../../../../components/CheckBox/CheckBox'
import Button from '../../../../components/Button/Button'

interface Option {
  id?: string | number
  value?: string | number
  label: string
}

interface MobileMultiSelectContentProps {
  title: string
  options: Option[]
  selectedOptions: (string | number)[]
  onSelectChange: (updated: (string | number)[]) => void
  onApply: () => void
  onReset: () => void
  getColorClass?: (label: string) => string
}

const MobileMultSelectContent = ({
  options,
  selectedOptions,
  onSelectChange,
  onApply,
  onReset,
  getColorClass = () => 'text-gray-900',
}: MobileMultiSelectContentProps) => {
  const handleCheckboxChange = (optionValue: string | number, isChecked: boolean) => {
    const newList = isChecked
      ? selectedOptions.filter(item => item !== optionValue)
      : [...selectedOptions, optionValue]
    onSelectChange(newList)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
        {options.map((option, index) => {
          const value = option.id ?? option.value ?? index
          const checked = selectedOptions.includes(value)

          return (
            <div
              key={option.label}
              className="flex items-center gap-3"
              onClick={() => handleCheckboxChange(value, checked)}
            >
              <CheckBox checked={checked} onChange={() => {}} type="default" />
              <span className={`text-fs16 ${getColorClass(option.label)}`}>{option.label}</span>
            </div>
          )
        })}
      </div>
      <div className="mt-10 flex w-full gap-3">
        <Button
          text="초기화"
          className="text-fs18 bg-gray-50 px-6.75 py-5 font-medium text-gray-800"
          onClick={onReset}
        />
        <Button
          text="적용하기"
          className="text-fs18 text-gray-10 bg-pri-500 w-full py-5 font-medium"
          onClick={onApply}
        />
      </div>
    </div>
  )
}

export default MobileMultSelectContent
