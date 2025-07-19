import CheckIcon from '@/assets/icons/check.svg?react'

interface CheckBoxProps {
  checked: boolean
  onChange: () => void
  type?: 'default' | 'check' | 'whiteCheckBox' | 'whiteCheck'
}

const CheckBox = ({ checked, onChange, type = 'default' }: CheckBoxProps) => {
  if (type === 'check' || type === 'whiteCheck') {
    const iconColor =
      type === 'check'
        ? checked
          ? 'text-pri-500'
          : 'text-gray-300'
        : checked
          ? 'text-gray-10'
          : 'text-mobile-transparent'

    return (
      <button
        type="button"
        onClick={onChange}
        className="transition-colors duration-200"
        aria-checked={checked}
        role="checkbox"
      >
        <CheckIcon className={iconColor} />
      </button>
    )
  }

  if (type === 'whiteCheckBox') {
    return (
      <div className="rounded-custom-s w-7 p-1 transition-colors duration-200">
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          onClick={onChange}
          className={`flex h-5 w-5 items-center justify-center rounded-xs ${checked ? 'bg-gray-10' : 'bg-mobile-transparent'}`}
        >
          <CheckIcon className={`p-0.5 ${checked ? 'text-pri-500' : 'text-gray-300'}`} />
        </button>
      </div>
    )
  }

  return (
    <div className="hover:bg-pri-100 rounded-custom-s w-7 p-1 transition-colors duration-200">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={onChange}
        className={`border-pri-500 flex h-5 w-5 items-center justify-center rounded-xs border ${checked ? 'bg-pri-500' : 'bg-transparent'}`}
      >
        {checked && <CheckIcon className="text-gray-10 p-0.5" />}
      </button>
    </div>
  )
}

export default CheckBox
