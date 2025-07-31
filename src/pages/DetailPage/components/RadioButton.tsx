interface RadioButtonProps {
  label: string
  checked: boolean
  onChange: () => void
}

const RadioButton = ({ label, checked, onChange }: RadioButtonProps) => {
  return (
    <div
      onClick={onChange}
      className="group flex cursor-pointer items-center gap-2 px-0 py-1.5 sm:py-2"
    >
      <div className="relative flex h-7 w-7 items-center justify-center">
        <div className="bg-pri-100 absolute h-7 w-7 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
        <div
          className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
            checked ? 'border-pri-500' : 'border-gray-200 group-hover:border-gray-200'
          }`}
        >
          {checked ? (
            <div className="bg-pri-500 h-2.5 w-2.5 rounded-full" />
          ) : (
            <div className="h-2.5 w-2.5 rounded-full bg-gray-200 opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </div>
      </div>
      <span className={`text-fs14 sm:text-fs16 ${checked ? 'text-gray-900' : 'text-gray-700'}`}>
        {label}
      </span>
    </div>
  )
}

export default RadioButton
